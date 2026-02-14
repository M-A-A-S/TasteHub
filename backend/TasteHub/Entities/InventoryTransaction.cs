using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class InventoryTransaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int IngredientBatchId { get; set; }

        [Required]
        public StockMovementType StockMovementType { get; set; } = Enums.StockMovementType.Out;

        [Required]
        [Column(TypeName = "decimal(18,3)")]
        public decimal Quantity { get; set; } // ALWAYS positive quantity, Movement type determines IN or OUT

        public int? UserId { get; set; }

        [Required]
        public StockMovementReason StockMovementReason { get; set; } = Enums.StockMovementReason.Sale;


        public DateTime InventoryTransactionDate { get; set; } = DateTime.UtcNow;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public IngredientBatch? IngredientBatch { get; set; } = null!;
        public User? User { get; set; }
    }
}
