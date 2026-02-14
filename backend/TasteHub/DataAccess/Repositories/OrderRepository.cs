using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.Order;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {

        public OrderRepository(AppDbContext context, ILogger<Order> logger)
: base(context, logger)
        {
        }

        public async Task<Result<Order>> GetOrderWithDetailsAsync(int orderId)
        {
            try
            {
                var order = await _context.Orders
                .Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItemSize).ThenInclude(ms => ms.Size)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItemSize).ThenInclude(ms => ms.MenuItem)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.OrderItemExtras).ThenInclude(oie => oie.Extra)
                .FirstOrDefaultAsync(o => o.Id == orderId);
                if (order == null)
                {
                    return Result<Order>.Failure(ResultCodes.NotFound);
                }
                return Result<Order>.Success(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving filtered orders.");
                return Result<Order>.Failure(ResultCodes.ServerError, 500, "Server error");
            }

        }

        public async Task<Result<PagedResult<Order>>> GetOrdersWithDetailsAsync(OrderFiltersDTO filters)
        {
            try
            {
                var query = _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItemSize)
                        .ThenInclude(ms => ms.Size)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItemSize)
                        .ThenInclude(ms => ms.MenuItem)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.OrderItemExtras)
                        .ThenInclude(oie => oie.Extra)
                .AsQueryable();


                // Search across fields
                if (!string.IsNullOrWhiteSpace(filters.SearchTerm))
                {
                    var term = $"%{filters.SearchTerm.Trim()}%";

                    query = query.Where(x =>
                       x.OrderItems.Any(oi =>
                            (oi.MenuItem != null && (
                                EF.Functions.Like(oi.MenuItem.NameEn, term) ||
                                EF.Functions.Like(oi.MenuItem.NameAr, term) ||
                                EF.Functions.Like(oi.MenuItem.DescriptionEn, term) ||
                                EF.Functions.Like(oi.MenuItem.DescriptionAr, term)
                            )) ||
                            (oi.MenuItemSize != null && oi.MenuItemSize.MenuItem != null && (
                                EF.Functions.Like(oi.MenuItemSize.MenuItem.NameEn, term) ||
                                EF.Functions.Like(oi.MenuItemSize.MenuItem.NameAr, term) ||
                                EF.Functions.Like(oi.MenuItemSize.MenuItem.DescriptionEn, term) ||
                                EF.Functions.Like(oi.MenuItemSize.MenuItem.DescriptionAr, term)
                            ))
                        )
                    );
                }

                // Filters
                if (filters.TableId.HasValue)
                {
                    query = query.Where(o => o.TableId == filters.TableId.Value);
                }
                if (filters.UserId.HasValue)
                {
                    query = query.Where(o => o.UserId == filters.UserId.Value);
                }
                if (filters.OrderStatus.HasValue)
                {
                    query = query.Where(o => o.OrderStatus == filters.OrderStatus.Value);
                }
                if (filters.OrderType.HasValue)
                {
                    query = query.Where(o => o.OrderType == filters.OrderType.Value);
                }
                if (filters.From.HasValue)
                {
                    query = query.Where(o => o.OrderDateTime >= filters.From.Value);
                }
                if (filters.To.HasValue)
                {
                    query = query.Where(o => o.OrderDateTime <= filters.To.Value);
                }

                // Sorting

                query = filters.SortBy switch
                {
                    MenuItemSortBy.PriceAsc =>
                        query.OrderBy(x => x.GrandTotal).ThenBy(x => x.Id),

                    MenuItemSortBy.PriceDesc =>
                    query.OrderByDescending(x => x.GrandTotal).ThenByDescending(x => x.Id),


                    MenuItemSortBy.Oldest =>
                    query.OrderBy(x => x.Id),

                    MenuItemSortBy.Newest =>
                        query.OrderByDescending(x => x.Id),

                    _ =>
                       query.OrderByDescending(x => x.Id)

                };


                // Pagination

                filters.PageNumber = filters.PageNumber < 1 ? 1 : filters.PageNumber;
                filters.PageSize = filters.PageSize < 1 ? 10 : filters.PageSize;
                filters.PageSize = filters.PageSize > 100 ? 100 : filters.PageSize;

                var total = await query.CountAsync();

                var items = await query
                    .Skip((filters.PageNumber - 1) * filters.PageSize)
                    .Take(filters.PageSize)
                    .ToListAsync();

                return Result<PagedResult<Order>>.Success(new PagedResult<Order>
                {
                    Items = items,
                    Total = total,
                    PageNumber = filters.PageNumber,
                    PageSize = filters.PageSize
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving filtered orders.");
                return Result<PagedResult<Order>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

    }
}
