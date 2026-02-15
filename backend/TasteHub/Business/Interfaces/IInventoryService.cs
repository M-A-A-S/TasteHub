using TasteHub.DTOs;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IInventoryService
    {
        Task<Result<bool>> DeductIngredientsAsync(IEnumerable<IngredientDeduction> deductions, int userId);
    }
}
