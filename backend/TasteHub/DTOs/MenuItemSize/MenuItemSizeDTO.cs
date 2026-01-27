using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.Size;
using TasteHub.Entities;

namespace TasteHub.DTOs.MenuItemSize
{
    public class MenuItemSizeDTO
    {
        public int? Id { get; set; } = default;
        public int MenuItemId { get; set; }
        public int SizeId { get; set; }
        public decimal Price { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public MenuItemDTO? MenuItem { get; set; }
        public SizeDTO? Size { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
