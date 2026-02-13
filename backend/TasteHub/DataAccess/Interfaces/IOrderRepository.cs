using TasteHub.DTOs.Order;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Result<Order>> GetOrderWithDetailsAsync(int orderId);
        Task<Result<PagedResult<Order>>> GetOrdersWithDetailsAsync(OrderFiltersDTO filters);
    }
}
