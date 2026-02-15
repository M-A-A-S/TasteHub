using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DTOs;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public InventoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<bool>> DeductIngredientsAsync(IEnumerable<IngredientDeduction> deductions, int userId)
        {
            if (!deductions.Any())
            {
                return Result<bool>.Success(true);
            }

            var ingredientIds = deductions.Select(d => d.IngredientId).Distinct().ToList();
            var ingredientBatchesResult = await _unitOfWork.IngredientBatches.GetAvailableBatchesAsync(ingredientIds);
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

                    await _unitOfWork.IngredientBatches.UpdateAsync(batch);

                    await _unitOfWork.InventoryTransactions.AddAsync(
                        new InventoryTransaction
                        {
                            Id = default,
                            IngredientBatchId = batch.Id,
                            Quantity = take,
                            StockMovementType = StockMovementType.Out,
                            StockMovementReason = StockMovementReason.Sale,
                            UserId = userId
                        });

                    remainingToTake -= take;
                }

                if (remainingToTake > 0)
                {
                    return Result<bool>.Failure(ResultCodes.InsufficientStock);
                }
            }

            return Result<bool>.Success(true);
        }

    }
}
