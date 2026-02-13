namespace TasteHub.DTOs.OrderItem
{
    public class CreateOrderItemRequest
    {
        public int MenuItemId { get; set; }
        public int MenuItemSizeId { get; set; }
        public short Quantity { get; set; }
        public IEnumerable<int>? ExtrasIds { get; set; }
    }
}
