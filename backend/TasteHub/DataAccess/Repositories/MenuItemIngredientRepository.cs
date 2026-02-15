using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class MenuItemIngredientRepository : Repository<MenuItemIngredient>, IMenuItemIngredientRepository
    {
        public MenuItemIngredientRepository(AppDbContext context, ILogger<MenuItemIngredient> logger)
        : base(context, logger)
        {
        }
    }
}
