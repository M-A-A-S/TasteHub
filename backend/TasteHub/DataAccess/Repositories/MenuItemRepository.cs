using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.MenuCategory;
using TasteHub.DTOs.MenuItem;
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

        public async Task<Result<PagedResult<MenuItemResponseDTO>>> GetFilteredAsync(
            int? categoryId = null,
            string? search = null,
            string? sort = null,
            int pageNumber = 1,
            int pageSize = 10)
        {
            try
            {
                IQueryable<MenuItem> query = _dbSet
                    .Include(x => x.MenuCategory);

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
                Console.WriteLine(query.ToQueryString());
                var total = await query.CountAsync();
                var items = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize).Select(
                    i =>  new MenuItemResponseDTO
                    {
                        Id = i.Id,
                        NameEn = i.NameEn,
                        NameAr = i.NameAr,
                        DescriptionEn = i.DescriptionEn,
                        DescriptionAr = i.DescriptionAr,
                        ImageUrl = i.ImageUrl,
                        IsActive = i.IsActive,
                        Price = i.Price,
                        CreatedAt = i.CreatedAt,
                        UpdatedAt = i.UpdatedAt,
                        Category = new MenuCategoryResponseDTO
                        {
                            Id = i.MenuCategory!.Id,
                            NameEn = i.MenuCategory.NameEn,
                            NameAr = i.MenuCategory.NameAr,
                            DescriptionEn = i.MenuCategory.DescriptionEn,
                            DescriptionAr = i.MenuCategory.DescriptionAr,
                            CreatedAt = i.MenuCategory.CreatedAt,
                            UpdatedAt = i.MenuCategory.UpdatedAt,
                        }
                    })
                    .ToListAsync();

                return Result<PagedResult<MenuItemResponseDTO>>.Success(new PagedResult<MenuItemResponseDTO>
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
                return Result<PagedResult<MenuItemResponseDTO>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }
    }
}
