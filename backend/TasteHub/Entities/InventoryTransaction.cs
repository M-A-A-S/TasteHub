using System.ComponentModel.DataAnnotations;
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
        public int Quantity { get; set; } // Positive for in, negative for out
        
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
