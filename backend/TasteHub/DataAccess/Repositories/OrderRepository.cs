using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {

        public OrderRepository(AppDbContext context, ILogger<Order> logger)
: base(context, logger)
        {
        }

    }
}
