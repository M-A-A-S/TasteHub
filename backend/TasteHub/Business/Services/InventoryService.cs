using TasteHub.Business.Interfaces;
using TasteHub.DTOs;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IIngredientBatchService _ingredientBatchService;
        private readonly IInventoryTransactionService _inventoryTransactionService;

        public InventoryService(IIngredientBatchService ingredientBatchService, 
            IInventoryTransactionService inventoryTransactionService)
        {
            _ingredientBatchService = ingredientBatchService;
            _inventoryTransactionService = inventoryTransactionService;
        }

        public async Task<Result<bool>> DeductIngredientAsync(int ingredientId, decimal quantity, int userId)
        {
            var batches = await _ingredientBatchService.GetAvailableBatchesAsync(ingredientId);

            if (!batches.IsSuccess || batches.Data == null || !batches.Data.Any())
            {
                return Result<bool>.Failure(ResultCodes.InsufficientStock);
            }

            decimal remainingToTake= quantity;

            // Loop through batches (FIFO)
            foreach (var batch in batches.Data)
            {
                if (remainingToTake <= 0)
                {
                    break;
                }

                var take = Math.Min(batch.RemainingQuantity, remainingToTake);

                // Deduct quantity from batch
                batch.RemainingQuantity -= take;

                // Update batch
                var IngredientBatchUpdatingResult = await _ingredientBatchService.UpdateAsync(batch.Id.Value, batch);
                if (!IngredientBatchUpdatingResult.IsSuccess)
                {
                    return Result<bool>.Failure(ResultCodes.ServerError);
                }

                // Insert sale inventory transaction
                var inventoryTransactionInsertingResult =  await _inventoryTransactionService.AddAsync(
                new InventoryTransactionDTO
                {
                    IngredientBatchId = batch.Id.Value,
                    Quantity = take,
                    StockMovementType = StockMovementType.Out,
                    StockMovementReason = StockMovementReason.Sale,
                    UserId = userId,
                });

                if (!inventoryTransactionInsertingResult.IsSuccess)
                {
                    return Result<bool>.Failure(ResultCodes.ServerError);
                }

                // Reduce the remaining quantity we need to deduct
                remainingToTake -= take;
            }

            // Check remaining AFTER all batches
            if (remainingToTake > 0)
            {
                return Result<bool>.Failure(ResultCodes.InsufficientStock);
            }

            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> DeductIngredientsAsync(IEnumerable<IngredientDeduction> deductions, int userId)
        {
            if (!deductions.Any())
            {
                return Result<bool>.Success(true);
            }

            var ingredientIds = deductions.Select(d => d.IngredientId).Distinct().ToList();
            var ingredientBatchesResult = await _ingredientBatchService.GetAvailableBatchesAsync(ingredientIds);
            if (!ingredientBatchesResult.IsSuccess || ingredientBatchesResult.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.InsufficientStock);
            }

            var batchesByIngredient = ingredientBatchesResult.Data
                .GroupBy(item => item.IngredientId)
                .ToDictionary(g => g.Key, g => g.OrderBy(item => item.CreatedAt).ToList());

            foreach (var deduction in deductions)
            {
                if (!batchesByIngredient.TryGetValue(deduction.IngredientId, out var ingredientBatches))
                {
                    return Result<bool>.Failure(ResultCodes.InsufficientStock);
                }

                decimal remainingToTake = deduction.Quantity;

                foreach (var batch in ingredientBatches)
                {
                    if (remainingToTake <= 0)
                    {
                        break;
                    }

                    var take = Math.Min(batch.RemainingQuantity, remainingToTake);
                    batch.RemainingQuantity -= take;

                    var transactionResult = await _inventoryTransactionService.AddAsync(
                        new InventoryTransactionDTO
                        {
                            IngredientBatchId = batch.Id.Value,
                            Quantity = take,
                            StockMovementType = StockMovementType.Out,
                            StockMovementReason = StockMovementReason.Sale,
                            UserId = userId
                        });

                    if (!transactionResult.IsSuccess)
                    {
                        return Result<bool>.Failure(ResultCodes.ServerError);
                    }

                    remainingToTake -= take;
                }

                if (remainingToTake > 0)
                {
                    return Result<bool>.Failure(ResultCodes.InsufficientStock);
                }
            }

            foreach (var batch in ingredientBatchesResult.Data)
            {
                var updateResult = await _ingredientBatchService.UpdateAsync(batch.Id.Value, batch);
                if (!updateResult.IsSuccess)
                {
                    return Result<bool>.Failure(ResultCodes.InsufficientStock);
                }
            }

            return Result<bool>.Success(true);
        }

    }
}
