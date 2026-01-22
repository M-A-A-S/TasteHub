using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class OrderItemExtra
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int OrderItemId { get; set; }

        [Required]
        public int ExtraId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public OrderItem? OrderItem { get; set; }
        public Extra? Extra { get; set; }
    }
}
