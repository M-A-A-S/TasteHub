using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.DTOs.Order;
using TasteHub.DTOs.OrderItemExtra;
using TasteHub.Entities;

namespace TasteHub.DTOs.OrderItem
{
    public class OrderItemDTO
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int? MenuItemSizeId { get; set; }
        public int? MenuItemId { get; set; }
        public short Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal LineTotal { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public OrderDTO Order { get; set; } = null!;
        public MenuItemDTO MenuItem { get; set; } = null!;
        public MenuItemSizeDTO? MenuItemSize { get; set; }
        public ICollection<OrderItemExtraDTO>? OrderItemExtras { get; set; }

    }
}
