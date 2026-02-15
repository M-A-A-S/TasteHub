using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class IngredientBatchRepository : Repository<IngredientBatch>, IIngredientBatchRepository
    {

        public IngredientBatchRepository(AppDbContext context, ILogger<IngredientBatch> logger)
    : base(context, logger)
        {
        }


        public async Task<Result<IEnumerable<IngredientBatch>>> GetAvailableBatchesAsync(int ingredientId)
        {
            try
            {
                var batches = await _dbSet
                    .Where(item => item.IngredientId == ingredientId
                                && item.RemainingQuantity > 0)
                    .OrderBy(item => item.ExpiryDate)
                    .AsNoTracking()
                    .ToListAsync();

                return Result<IEnumerable<IngredientBatch>>.Success(batches);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<IEnumerable<IngredientBatch>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public async Task<Result<IEnumerable<IngredientBatch>>> GetAvailableBatchesAsync(IEnumerable<int> ingredientIds)
        {
            try
            {
                var batches = await _dbSet
                    .Where(item => ingredientIds.Contains(item.IngredientId)
                                && item.RemainingQuantity > 0)
                    .OrderBy(item => item.ExpiryDate)
                    .AsNoTracking()
                    .ToListAsync();

                return Result<IEnumerable<IngredientBatch>>.Success(batches);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<IEnumerable<IngredientBatch>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public async Task<Result<decimal>> GetTotalRemainingQuantityAsync(int ingredientId)
        {
            try
            {
                var total = await _dbSet
                    .Where(item => item.IngredientId == ingredientId)
                    .SumAsync(item => item.RemainingQuantity);

                return Result<decimal>.Success(total);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<decimal>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

    }
}
