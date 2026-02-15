using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class IngredientRepository : Repository<Ingredient>, IIngredientRepository
    {
        public IngredientRepository(AppDbContext context, ILogger<Ingredient> logger)
            : base(context, logger)
        {
        }
        
    }
}
