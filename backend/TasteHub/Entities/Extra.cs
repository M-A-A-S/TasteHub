using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class Extra
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int GroupId { get; set; }

        [Required]
        [StringLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string NameEn { get; set; } = null!;

        [Required]
        [StringLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string NameAr { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ExtrasGroup? Group { get; set; }
        public ICollection<OrderItemExtra>? OrderItemExtras { get; set; }
    }
}
