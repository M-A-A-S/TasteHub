using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;
using static Azure.Core.HttpHeader;

namespace TasteHub.Business.Services
{
    public class InventoryTransactionService : IInventoryTransactionService
    {
        private readonly IInventoryTransactionRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public InventoryTransactionService(IInventoryTransactionRepository repo, IUnitOfWork unitOfWork)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
        }

        #region CRUD
        public async Task<Result<InventoryTransactionDTO>> AddAsync(InventoryTransactionDTO DTO)
        {
            var addResult = await _repo.AddAsync(DTO.ToEntity());
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            var findResult = await GetByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            return Result<InventoryTransactionDTO>.Success(findResult.Data);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<InventoryTransactionDTO>>> GetAllAsync()
        {
            var inventoryTransactions = await _repo.GetAllAsync();

            if (!inventoryTransactions.IsSuccess || inventoryTransactions.Data == null)
            {
                return Result<IEnumerable<InventoryTransactionDTO>>.Failure();
            }
            var result = inventoryTransactions.Data.Select(item => item.ToDTO());
            return Result<IEnumerable<InventoryTransactionDTO>>.Success(result);
        }

        public async Task<Result<InventoryTransactionDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }
            return Result<InventoryTransactionDTO>.Success(findResult.Data.ToDTO());
        }

        public async Task<Result<InventoryTransactionDTO>> UpdateAsync(int id, InventoryTransactionDTO DTO)
        {
            var findResult = await FindByIdAsync(id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            findResult.Data.UpdateFromDTO(DTO);

            var updateResult = await _repo.UpdateAsync(findResult.Data);
            if (!updateResult.IsSuccess || updateResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            return await GetByIdAsync(id);
        }

        private async Task<Result<InventoryTransaction>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
        #endregion

        #region Inventory Logic
        // Deduct stock (Usage, Sale, Waste)
        public async Task<Result<bool>> DeductIngredientsAsync(
            IEnumerable<IngredientDeductionDTO> deductions,
            int userId,
            StockMovementReason reason = StockMovementReason.Sale,
            bool commit = false
            )
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
                            StockMovementReason = reason,
                            UserId = userId
                        });

                    remainingToTake -= take;
                }

                if (remainingToTake > 0)
                {
                    return Result<bool>.Failure(ResultCodes.InsufficientStock);
                }
            }

            if (commit)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return Result<bool>.Success(true);
        }


        //Add stock(Purchase, Return, Adjustment)
        public async Task<Result<bool>> AddIngredientsAsync(
            IEnumerable<IngredientAdditionDTO> additions, 
            int userId, 
            StockMovementReason reason = StockMovementReason.Purchase,
            bool commit = false
        )
        {
            if (!additions.Any())
            {
                return Result<bool>.Success(true);
            }

            foreach (var addition in additions)
            {
                var batch = new IngredientBatch
                {
                    IngredientId = addition.IngredientId,
                    Quantity = addition.Quantity,
                    RemainingQuantity = addition.Quantity,
                    CostPerUnit = addition.CostPerUnit,
                    ExpiryDate = addition.ExpiryDate,   
                    BatchNumber = addition.BatchNumber,
                    CreatedAt = DateTime.UtcNow,
                };

                var addBatchResult = await _unitOfWork.IngredientBatches.AddAsync(batch);

                await _unitOfWork.InventoryTransactions.AddAsync(new InventoryTransaction
                {
                    IngredientBatch = batch,
                    Quantity = addition.Quantity,
                    StockMovementType = StockMovementType.In,
                    StockMovementReason = reason,
                    UserId = userId,
                    InventoryTransactionDate = DateTime.UtcNow  
                });
            }

            if (commit)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return Result<bool>.Success(true);  
        }
        #endregion

    }
}
