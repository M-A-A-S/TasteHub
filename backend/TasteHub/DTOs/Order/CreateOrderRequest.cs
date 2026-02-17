using TasteHub.DTOs.OrderItem;
using TasteHub.Enums;

namespace TasteHub.DTOs.Order
{
    public class CreateOrderRequest
    {
        public int? TableId { get; set; }
        public int? UserId { get; set; } = 1; // TODO: get it form logged in user
        public OrderType? OrderType { get; set; } = Enums.OrderType.DineIn;
        public IEnumerable<CreateOrderItemRequest> Items { get; set; }
    }
}
