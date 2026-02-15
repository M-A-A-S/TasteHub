using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.InventoryTransaction;
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
    }
}
