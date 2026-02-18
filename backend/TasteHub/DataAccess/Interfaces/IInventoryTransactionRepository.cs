using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IInventoryTransactionRepository : IRepository<InventoryTransaction>
    {
        Task<Result<IEnumerable<InventoryTransaction>>> GetAllAsync();
    }
}
