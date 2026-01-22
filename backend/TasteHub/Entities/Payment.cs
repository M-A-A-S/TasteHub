using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PaidAmount { get; set; }

        [Required]
        public int PaymentMethodId { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string? TransactionReference { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Order? Order { get; set; } = null!;
        public PaymentMethod? PaymentMethod { get; set; } = null!;
    }
}
