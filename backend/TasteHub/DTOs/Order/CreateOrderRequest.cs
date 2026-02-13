using TasteHub.DTOs.OrderItem;

namespace TasteHub.DTOs.Order
{
    public class CreateOrderRequest
    {
        public int? TableId { get; set; }
        public IEnumerable<CreateOrderItemRequest> Items { get; set; }
    }
}
