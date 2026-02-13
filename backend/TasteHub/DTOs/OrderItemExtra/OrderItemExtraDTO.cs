using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.OrderItem;

namespace TasteHub.DTOs.OrderItemExtra
{
    public class OrderItemExtraDTO
    {

        public int Id { get; set; }
        public int OrderItemId { get; set; }
        public int ExtraId { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public OrderItemDTO? OrderItem { get; set; }
        public ExtraDTO? Extra { get; set; }
    }
}
