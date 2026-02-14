using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Dashboard;
using TasteHub.Enums;
using TasteHub.Utilities;
using static Azure.Core.HttpHeader;

namespace TasteHub.DataAccess.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {

        private readonly AppDbContext _context;

        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Result<IEnumerable<SalesDTO>>> GetSalesDataAsync(DateTime start, DateTime end)
        {
            var salesRaw = await _context.Orders
                .Where(o => o.CreatedAt >= start && o.CreatedAt <= end)
                .GroupBy(o => o.CreatedAt.Hour)
                .Select(g => new
                {
                    Hour = g.Key,
                    Sales = g.Sum(o => o.GrandTotal)

                })
                .OrderBy(d => d.Hour)
                .ToListAsync();

            var sales = salesRaw.Select(x => new SalesDTO
            {
                Time = $"{x.Hour:D2}:00",
                Sales = x.Sales
            });

            return Result<IEnumerable<SalesDTO>>.Success(sales);
        }

        //public async Task<Result<IEnumerable<TopItemDTO>>> GetTopItemsAsync(DateTime start, DateTime end)
        //{

        //    var topItems = await _context.OrderItems
        //        .Where(oi =>
        //            oi.Order.CreatedAt >= start &&
        //            oi.Order.CreatedAt <= end &&
        //            (oi.MenuItemId != null || oi.MenuItemId != null)
        //        )
        //        .Select(oi => new
        //        {
        //            Id = oi.MenuItemId != null
        //            ? oi.MenuItemId.Value
        //            : oi.MenuItemSize.MenuItemId,

        //            NameEn = oi.MenuItemId != null
        //                ? oi.MenuItem.NameEn
        //                : oi.MenuItemSize.MenuItem.NameEn,

        //            NameAr = oi.MenuItemId != null
        //                ? oi.MenuItem.NameAr
        //                : oi.MenuItemSize.MenuItem.NameAr,
        //        }
        //        )
        //        .GroupBy(x => new { x.Id, x.NameEn, x.NameAr })
        //        .Select(g => new TopItemDTO
        //        {
        //            Id = g.Key.Id,
        //            NameEn = g.Key.NameEn ?? "",
        //            NameAr = g.Key.NameAr ?? "",
        //            OrdersCount = g.Count()
        //        })
        //        .OrderByDescending(x => x.OrdersCount)
        //        .Take(10)
        //        .ToListAsync();


        //    return Result<IEnumerable<TopItemDTO>>.Success(topItems);
        //}

        public async Task<Result<IEnumerable<TopItemDTO>>> GetTopItemsAsync(DateTime start, DateTime end)
        {
            var topItemsQuery =
                from oi in _context.OrderItems
                join o in _context.Orders on oi.OrderId equals o.Id

                join mi in _context.MenuItems
                    on oi.MenuItemId equals mi.Id into miGroup
                from mi in miGroup.DefaultIfEmpty()

                join mis in _context.MenuItemSizes
                    on oi.MenuItemSizeId equals mis.Id into misGroup
                from mis in misGroup.DefaultIfEmpty()

                join mi2 in _context.MenuItems
                    on mis.MenuItemId equals mi2.Id into mi2Group
                from mi2 in mi2Group.DefaultIfEmpty()

                where o.CreatedAt >= start && o.CreatedAt <= end

                select new
                {
                    Id = mi != null ? mi.Id : mi2.Id,
                    NameEn = mi != null ? mi.NameEn : mi2.NameEn,
                    NameAr = mi != null ? mi.NameAr : mi2.NameAr
                };

            var topItems = await topItemsQuery
                .Where(x => x.Id != null)
                .GroupBy(x => new { x.Id, x.NameEn, x.NameAr })
                .Select(g => new TopItemDTO
                {
                    Id = g.Key.Id,
                    NameEn = g.Key.NameEn,
                    NameAr = g.Key.NameAr,
                    OrdersCount = g.Count()
                })
                .OrderByDescending(x => x.OrdersCount)
                .Take(10)
                .ToListAsync();

            return Result<IEnumerable<TopItemDTO>>.Success(topItems);
        }


        public async Task<Result<IEnumerable<StatDTO>>> GetStatsAsync(DateTime start, DateTime end)
        {

            var totalOrders = await _context.Orders
                .CountAsync(o =>
                o.CreatedAt <= start && o.CreatedAt <= end);

            var totalRevenue = await _context.Orders
                .Where(o =>
                    o.CreatedAt >= start && 
                    o.CreatedAt <= end)
                .SumAsync(o => (decimal?)o.GrandTotal) ?? 0;

            //var totalCustomers = await _context.Customers.CountAsync();

            //var pendingOrders = await _context.Orders.CountAsync(
            //    o => o.OrderStatus == OrderStatus.Pending);

            var occupiedTables = await _context.Tables.CountAsync(t => t.TableStatus == TableStatus.Occupied);
            var totalTables = await _context.Tables.CountAsync();
            var tableOccupancy = totalTables > 0 ? (occupiedTables * 100m / totalTables) : 0;

            var lowStockItems = await _context.Ingredients
                .Select(i => new
                {
                    TotalStock = i.IngredientBatches.Sum(b => b.Quantity),
                    i.LowStockThreshold
                })
                .CountAsync(x => x.TotalStock <= x.LowStockThreshold);

            var stats = new List<StatDTO>()
            {
                new StatDTO
                {
                    Key = "today_sales",
                    Value = totalRevenue,
                },
                new StatDTO
                {
                    Key = "total_orders",
                    Value = totalOrders,
                },
                new StatDTO
                {
                    Key = "table_occupancy",
                    Value = tableOccupancy,
                },
                new StatDTO
                {
                    Key = "low_stock_alerts",
                    Value = lowStockItems,
                },
            };

            return Result<IEnumerable<StatDTO>>.Success(stats);
        }
    }
}
