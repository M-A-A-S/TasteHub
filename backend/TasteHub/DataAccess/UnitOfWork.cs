using TasteHub.DataAccess.Interfaces;

namespace TasteHub.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UnitOfWork> _logger;

        public IOrderRepository Orders { get; }
        public IIngredientBatchRepository IngredientBatches { get; }
        public IInventoryTransactionRepository InventoryTransactions { get; }
        public IMenuItemRepository MenuItems { get; }
        public IMenuItemSizeRepository MenuItemSizes { get; }
        public IMenuItemExtraRepository MenuItemExtras { get; }
        public IExtraRepository Extras { get; }

        public UnitOfWork(AppDbContext context, 
            ILogger<UnitOfWork> logger, 
            IOrderRepository orders, 
            IIngredientBatchRepository ingredientBatches, 
            IInventoryTransactionRepository inventoryTransactions,
            IMenuItemRepository menuItems,
            IMenuItemSizeRepository menuItemSizes,
            IMenuItemExtraRepository menuItemExtras,
            IExtraRepository extras
            )
        {
            _context = context;
            Orders = orders;
            IngredientBatches = ingredientBatches;
            InventoryTransactions = inventoryTransactions;
            MenuItems = menuItems;
            MenuItemSizes = menuItemSizes;
            MenuItemExtras = menuItemExtras;
            Extras = extras;
            _logger = logger;
        }

        public async Task<int> SaveChangesAsync()
        {
            try
            {
                return await _context.SaveChangesAsync();
            } 
            catch ( Exception ex )
            {
                _logger.LogError(ex, "Error saving changes in UnitOfWork");
                throw;
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
