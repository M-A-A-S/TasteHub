using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class MenuCategoryRepository : Repository<MenuCategory>, IMenuCategoryRepository
    {

        public MenuCategoryRepository(AppDbContext context, ILogger<MenuCategory> logger) 
            : base(context, logger)
        {
        }
    }
}
