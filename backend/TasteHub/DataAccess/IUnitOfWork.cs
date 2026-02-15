using TasteHub.DataAccess.Interfaces;

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

        Task<int> SaveChangesAsync();

    }
}
