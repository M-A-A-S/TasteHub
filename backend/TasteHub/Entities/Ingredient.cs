using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Ingredient 
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [Column(TypeName = "varchar(50)")]

        public string NameEn { get; set; } = null!;
        [Required]
        [StringLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string NameAr { get; set; } = null!;

        [Required]
        public IngredientUnit Unit { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,3)")]
        public decimal LowStockThreshold { get; set; } // Minimum stock before alert triggers

        public int? SupplierId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Supplier? Supplier { get; set; }
        public ICollection<MenuItemIngredient>? MenuItemIngredients { get; set; }
        public ICollection<IngredientBatch>? IngredientBatches { get; set; }

        [NotMapped]
        public decimal CurrentStock => IngredientBatches?.Sum(b => b.RemainingQuantity) ?? 0;

    }
}
