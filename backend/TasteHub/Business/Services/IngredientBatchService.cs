using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;

namespace TasteHub.Business.Services
{
    public class IngredientBatchService : IIngredientBatchService
    {
        private readonly IIngredientBatchRepository _repo;

        public IngredientBatchService(IIngredientBatchRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<IngredientBatchDTO>> AddAsync(IngredientBatchDTO DTO)
        {
            var addResult = await _repo.AddAsync(DTO.ToEntity());
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<IngredientBatchDTO>.Failure();
            }

            var findResult = await GetByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<IngredientBatchDTO>.Failure();
            }

            return Result<IngredientBatchDTO>.Success(findResult.Data);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<IngredientBatchDTO>>> GetAllAsync()
        {
            var ingredientBatches = await _repo.GetAllAsync();

            if (!ingredientBatches.IsSuccess || ingredientBatches.Data == null)
            {
                return Result<IEnumerable<IngredientBatchDTO>>.Failure();
            }
            var result = ingredientBatches.Data.Select(item => item.ToDTO());
            return Result<IEnumerable<IngredientBatchDTO>>.Success(result);
        }

        public async Task<Result<IEnumerable<IngredientBatchDTO>>> GetAvailableBatchesAsync(int ingredientId)
        {
            var ingredientBatches = await _repo.GetAvailableBatchesAsync(ingredientId);

            if (!ingredientBatches.IsSuccess || ingredientBatches.Data == null)
            {
                return Result<IEnumerable<IngredientBatchDTO>>.Failure();
            }
            var result = ingredientBatches.Data.Select(item => item.ToDTO());
            return Result<IEnumerable<IngredientBatchDTO>>.Success(result);
        }

        public async Task<Result<IEnumerable<IngredientBatchDTO>>> GetAvailableBatchesAsync(IEnumerable<int> ingredientIds)
        {
            var ingredientBatches = await _repo.GetAvailableBatchesAsync(ingredientIds);

            if (!ingredientBatches.IsSuccess || ingredientBatches.Data == null)
            {
                return Result<IEnumerable<IngredientBatchDTO>>.Failure();
            }
            var result = ingredientBatches.Data.Select(item => item.ToDTO());
            return Result<IEnumerable<IngredientBatchDTO>>.Success(result);
        }

        public async Task<Result<IngredientBatchDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<IngredientBatchDTO>.Failure();
            }
            return Result<IngredientBatchDTO>.Success(findResult.Data.ToDTO());
        }

        public async Task<Result<decimal>> GetTotalRemainingQuantityAsync(int ingredientId)
        {
            return await _repo.GetTotalRemainingQuantityAsync(ingredientId);
        }

        public async Task<Result<IngredientBatchDTO>> UpdateAsync(int id, IngredientBatchDTO DTO)
        {
            var findResult = await FindByIdAsync(id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<IngredientBatchDTO>.Failure();
            }

            findResult.Data.UpdateFromDTO(DTO);

            var updateResult = await _repo.UpdateAsync(findResult.Data);
            if (!updateResult.IsSuccess || updateResult.Data == null)
            {
                return Result<IngredientBatchDTO>.Failure();
            }

            return await GetByIdAsync(id);
        }

        private async Task<Result<IngredientBatch>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
    }
}
