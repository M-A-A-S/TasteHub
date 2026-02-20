using TasteHub.DataAccess.Interfaces;
using TasteHub.Utilities;

namespace TasteHub.DataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        IOrderRepository Orders { get; }
        IIngredientBatchRepository IngredientBatches { get; }
        IInventoryTransactionRepository InventoryTransactions { get; }
        IMenuItemRepository MenuItems { get; }
        IMenuItemSizeRepository MenuItemSizes {  get; }
        IMenuItemExtraRepository MenuItemExtras { get; }
        IExtraRepository Extras { get; }
        public IEmployeeRepository Employees { get; }
        public IUserRepository Users { get; }
        public IUserRoleRepository UserRoles { get; }
        public IPersonRepository People { get; }

        //Task<int> SaveChangesAsync();
        Task<Result<int>> SaveChangesAsync();

    }
}
