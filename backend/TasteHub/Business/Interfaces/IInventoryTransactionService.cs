using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.Enums;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IInventoryTransactionService
    {
        Task<Result<IEnumerable<InventoryTransactionDTO>>> GetAllAsync();
        Task<Result<InventoryTransactionDTO>> GetByIdAsync(int id);
        Task<Result<InventoryTransactionDTO>> AddAsync(InventoryTransactionDTO DTO);
        Task<Result<InventoryTransactionDTO>> UpdateAsync(int id, InventoryTransactionDTO DTO);
        Task<Result<bool>> DeleteAsync(int id);

        Task<Result<bool>> DeductIngredientsAsync(IEnumerable<IngredientDeductionDTO> deductions, int userId, StockMovementReason reason = StockMovementReason.Sale, bool commit = false);
        Task<Result<bool>> AddIngredientsAsync(IEnumerable<IngredientAdditionDTO> additions, int userId, StockMovementReason reason = StockMovementReason.Purchase, bool commit = false);
    }
}
