using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class InventoryTransactionRepository : Repository<InventoryTransaction>, IInventoryTransactionRepository
    {
        public InventoryTransactionRepository(AppDbContext context, ILogger<InventoryTransaction> logger)
    : base(context, logger)
        {
        }

        public async Task<Result<IEnumerable<InventoryTransaction>>> GetAllAsync()
        {
            try
            {
                IQueryable<InventoryTransaction> query = _dbSet.AsNoTracking().AsSplitQuery();


                query = query.Include(x => x.IngredientBatch)
                        .ThenInclude(x => x.Ingredient);
                        //.ThenInclude(x => x.IngredientBatches);


                var data = await query.ToListAsync();

                return Result<IEnumerable<InventoryTransaction>>.Success(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<IEnumerable<InventoryTransaction>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

    }
}
