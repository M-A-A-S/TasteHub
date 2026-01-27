using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class MenuItemSizeRepository : Repository<MenuItemSize>, IMenuItemSizeRepository
    {

        public MenuItemSizeRepository(AppDbContext context, ILogger<MenuItemSize> logger)
: base(context, logger)
        {
        }

    }
}
