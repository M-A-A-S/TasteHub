using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IIngredientBatchRepository : IRepository<IngredientBatch>
    {

        Task<Result<IEnumerable<IngredientBatch>>> GetAvailableBatchesAsync(int ingredientId);
        Task<Result<decimal>> GetTotalRemainingQuantityAsync(int ingredientId);
        Task<Result<IEnumerable<IngredientBatch>>> GetAvailableBatchesAsync(IEnumerable<int> ingredientIds);
    }
}
