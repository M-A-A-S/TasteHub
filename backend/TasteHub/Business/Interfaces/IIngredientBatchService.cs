using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IIngredientBatchService
    {
        Task<Result<IEnumerable<IngredientBatchDTO>>> GetAllAsync();
        Task<Result<IngredientBatchDTO>> GetByIdAsync(int id);
        Task<Result<IngredientBatchDTO>> AddAsync(IngredientBatchDTO DTO);
        Task<Result<IngredientBatchDTO>> UpdateAsync(int id, IngredientBatchDTO DTO);
        Task<Result<bool>> DeleteAsync(int id);

        Task<Result<IEnumerable<IngredientBatchDTO>>> GetAvailableBatchesAsync(int ingredientId);
        Task<Result<IEnumerable<IngredientBatchDTO>>> GetAvailableBatchesAsync(IEnumerable<int> ingredientIds);
        Task<Result<decimal>> GetTotalRemainingQuantityAsync(int ingredientId);

    }
}
