using TasteHub.DTOs.Order;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IOrderService
    {
        Task<Result<OrderDTO>> CreateOrderAsync(CreateOrderRequest request);
    }
}
