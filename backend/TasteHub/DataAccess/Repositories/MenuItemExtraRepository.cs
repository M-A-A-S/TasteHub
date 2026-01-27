using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class MenuItemExtraRepository : Repository<MenuItemExtra>,  IMenuItemExtraRepository
    {

        public MenuItemExtraRepository(AppDbContext context, ILogger<MenuItemExtra> logger)
: base(context, logger)
        {

        }

    }
}
