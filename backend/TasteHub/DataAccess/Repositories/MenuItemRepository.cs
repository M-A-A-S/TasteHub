using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.DTOs.MenuCategory;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.MenuItemExtra;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.DTOs.Size;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class MenuItemRepository : Repository<MenuItem>, IMenuItemRepository
    {

        public MenuItemRepository(AppDbContext context, ILogger<MenuItem> logger)
            : base(context, logger)
        {
        }

        public async Task<Result<PagedResult<MenuItemDTO>>> GetFilteredAsync(
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
                    i => new MenuItemDTO
                    {
                        Id = i.Id,
                        NameEn = i.NameEn,
                        NameAr = i.NameAr,
                        DescriptionEn = i.DescriptionEn,
                        MenuCategoryId = i.MenuCategoryId,
                        DescriptionAr = i.DescriptionAr,
                        ImageUrl = i.ImageUrl,
                        IsActive = i.IsActive,
                        Price = i.Price,
                        CreatedAt = i.CreatedAt,
                        UpdatedAt = i.UpdatedAt,

                        MenuCategory = new MenuCategoryDTO
                        {
                            Id = i.MenuCategory!.Id,
                            NameEn = i.MenuCategory.NameEn,
                            NameAr = i.MenuCategory.NameAr,
                            DescriptionEn = i.MenuCategory.DescriptionEn,
                            DescriptionAr = i.MenuCategory.DescriptionAr,
                            CreatedAt = i.MenuCategory.CreatedAt,
                            UpdatedAt = i.MenuCategory.UpdatedAt,
                        },
                        MenuItemSizes = i.MenuItemSizes
                        .Select(s => new MenuItemSizeDTO
                        {
                            Id = s.Id,
                            MenuItemId = s.MenuItemId,
                            SizeId = s.SizeId,
                            Price = s.Price,
                            CreatedAt = s.CreatedAt,
                            UpdatedAt = s.UpdatedAt,

                            Size = new SizeDTO
                            {
                                Id = s.Size.Id,
                                NameEn = s.Size.NameEn,
                                NameAr = s.Size.NameAr,
                                PriceModifier = s.Size.PriceModifier,
                                CreatedAt = s.Size.CreatedAt,
                                UpdatedAt = s.Size.UpdatedAt
                            }
                        }).ToList(),
                        MenuItemExtras = i.MenuItemExtras
                        .Select(x => new MenuItemExtraDTO
                        {
                            Id = x.Id,
                            MenuItemId= x.MenuItemId,
                            ExtrasGroupId = x.ExtrasGroupId,
                            CreatedAt = x.CreatedAt,
                            UpdatedAt = x.UpdatedAt,
                            ExtrasGroup = new ExtraGroupDTO
                            {
                                Id = x.ExtrasGroup.Id,
                                NameEn = x.ExtrasGroup.NameEn,
                                NameAr = x.ExtrasGroup.NameAr,
                                MaxSelect = x.ExtrasGroup.MaxSelect,
                                Required = x.ExtrasGroup.Required,
                                Extras = x.ExtrasGroup.Extras
                                .Select(e => new ExtraDTO
                                {
                                    Id = e.Id,
                                    NameEn = e.NameEn,
                                    NameAr = e.NameAr,
                                    Price = e.Price,
                                    GroupId = e.GroupId,
                                }).ToList()
                            }
                        }).ToList()
                    })
                    .ToListAsync();

                return Result<PagedResult<MenuItemDTO>>.Success(new PagedResult<MenuItemDTO>
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
                return Result<PagedResult<MenuItemDTO>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

    }
}
