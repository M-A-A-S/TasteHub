using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class IngredientBatch
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int IngredientId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime ExpiryDate { get; set; }

        [Required]
        [StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string BatchNumber { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Ingredient? Ingredient { get; set; }
        public ICollection<InventoryTransaction>? InventoryTransactions { get; set; }
    }
}
