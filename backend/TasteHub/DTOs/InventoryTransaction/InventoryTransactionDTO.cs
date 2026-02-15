using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.User;
using TasteHub.Enums;

namespace TasteHub.DTOs.InventoryTransaction
{
    public class InventoryTransactionDTO
    {
        public int? Id { get; set; }
        public int IngredientBatchId { get; set; }
        public StockMovementType StockMovementType { get; set; } = Enums.StockMovementType.Out;
        public decimal Quantity { get; set; } // ALWAYS positive quantity, Movement type determines IN or OUT
        public int? UserId { get; set; }
        public StockMovementReason StockMovementReason { get; set; } = Enums.StockMovementReason.Sale;
        public DateTime InventoryTransactionDate { get; set; } = DateTime.UtcNow;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public IngredientBatchDTO? IngredientBatch { get; set; } = null!;
        public UserDTO? User { get; set; }

    }
}
