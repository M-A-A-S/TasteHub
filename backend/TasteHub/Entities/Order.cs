using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int? TableId { get; set; } // Nullable for takeaway/delivery
        public int? CustomerId { get; set; }
        public int UserId { get; set; } // Staff who took the order

        [Required]
        public OrderStatus OrderStatus { get; set; } = Enums.OrderStatus.Pending;
        public OrderType OrderType { get; set; } = Enums.OrderType.DineIn;
        public DateTime OrderDateTime { get; set; } = DateTime.UtcNow;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal SubtotalAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TaxAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal GrandTotal { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Customer? Customer { get; set; } = null!;
        public User User { get; set; } = null!;
        public Table? Table { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
        public ICollection<Payment>? Payments { get; set; }
    }
}
