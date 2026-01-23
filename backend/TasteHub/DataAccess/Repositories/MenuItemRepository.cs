using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class MenuItemRepository : Repository<MenuItem>, IMenuItemRepository
    {

        public MenuItemRepository(AppDbContext context, ILogger<MenuItem> logger)
            : base(context, logger)
        {
        }

        public async Task<Result<PagedResult<MenuItem>>> GetFilteredAsync(
            int? categoryId = null,
            string? search = null,
            string? sort = null,
            int pageNumber = 1,
            int pageSize = 10)
        {
            try
            {
                IQueryable<MenuItem> query = _dbSet.AsNoTracking().Include(x => x.MenuCategory);

                //Filter by category
                if (categoryId.HasValue)
                {
                    query = query.Where(x => x.MenuCategoryId == categoryId.Value);
                }

                // Search across fields
                if (!string.IsNullOrWhiteSpace(search))
                {
                    search = search.ToLower();
                    query = query.Where(x =>
                        x.NameEn.ToLower().Contains(search) ||
                        x.NameAr.ToLower().Contains(search) ||
                        (x.DescriptionEn != null && x.DescriptionEn.ToLower().Contains(search)) ||
                        (x.DescriptionAr != null && x.DescriptionAr.ToLower().Contains(search))
                    );
                }

                // Sorting
                if (!string.IsNullOrWhiteSpace(sort))
                {
                    var parts = sort.Split('_');
                    var property = parts[0];
                    var ascending = parts.Length < 2 || parts[1].ToLower() == "asc";

                    var propInfo = typeof(MenuItem).GetProperty(property, System.Reflection.BindingFlags.IgnoreCase | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
                    if (propInfo != null)
                    {
                        query = ascending
                            ? query.OrderBy(e => EF.Property<object>(e, propInfo.Name))
                            : query.OrderByDescending(e => EF.Property<object>(e, propInfo.Name));
                    }
                }
                else
                {
                    query = query.OrderBy(x => x.Id); // default
                }

                // Pagination
                pageNumber = pageNumber < 1 ? 1 : pageNumber;
                pageSize = pageSize < 1 ? 10 : pageSize;
                pageSize = pageSize > 100 ? 100 : pageSize;

                var total = await query.CountAsync();
                var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

                return Result<PagedResult<MenuItem>>.Success(new PagedResult<MenuItem>
                {
                    Items = items,
                    Total = total,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving filtered menu items.");
                return Result<PagedResult<MenuItem>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }
    }
}
