using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.MenuCategory;
using TasteHub.DTOs.MenuItem;
using TasteHub.Entities;
using TasteHub.Enums;
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
            MenuItemFiltersDTO filters)
        {
            try
            {
                IQueryable<MenuItem> query = _dbSet.AsNoTracking();

                //Filter by category
                if (filters.CategoryId.HasValue)
                {
                    query = query.Where(x => x.MenuCategoryId == filters.CategoryId);
                }

                // Search across fields
                if (!string.IsNullOrWhiteSpace(filters.SearchTerm))
                {
                    var term = $"%{filters.SearchTerm.Trim()}%";

                    query = query.Where(x =>
                        EF.Functions.Like(x.NameEn, term) ||
                        EF.Functions.Like(x.NameAr, term) ||
                        EF.Functions.Like(x.DescriptionEn, term) ||
                        EF.Functions.Like(x.DescriptionAr, term)
                    );
                }

                // Sorting

                query = filters.SortBy switch
                {
                    MenuItemSortBy.PriceAsc =>
                        query.OrderBy(x => x.Price).ThenBy(x => x.Id),

                    MenuItemSortBy.PriceDesc =>
                    query.OrderByDescending(x => x.Price).ThenByDescending(x => x.Id),


                    MenuItemSortBy.Oldest =>
                    query.OrderBy(x => x.Price),

                    MenuItemSortBy.Newest =>
                        query.OrderByDescending(x => x.Id),

                    _ =>
                       query.OrderByDescending(x => x.Id)

                };

                // Pagination
                filters.PageNumber = filters.PageNumber < 1 ? 1 : filters.PageNumber;
                filters.PageSize = filters.PageSize < 1 ? 10 : filters.PageSize;
                filters.PageSize = filters.PageSize > 100 ? 100 : filters.PageSize;
                Console.WriteLine(query.ToQueryString());
                
                var total = await query.CountAsync();
                var items = await query
                    .Skip((filters.PageNumber - 1) * filters.PageSize)
                    .Take(filters.PageSize).Select(
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
                    PageNumber = filters.PageNumber,
                    PageSize = filters.PageSize
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
