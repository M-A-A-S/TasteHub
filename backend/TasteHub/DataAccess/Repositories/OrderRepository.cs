using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;
using TasteHub.Utilities;

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
            var order = await _context.Orders
                .Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItemSize).ThenInclude(ms => ms.Size)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItemSize).ThenInclude(ms => ms.MenuItem)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.OrderItemExtras).ThenInclude(oie => oie.Extra)
                .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
            {
                return Result<Order>.Failure();
            }
            return Result<Order>.Success(order);
        }

    }
}
