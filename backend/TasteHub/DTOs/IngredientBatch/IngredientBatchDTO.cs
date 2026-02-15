using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.InventoryTransaction;

namespace TasteHub.DTOs.IngredientBatch
{
    public class IngredientBatchDTO
    {
        public int? Id { get; set; }
        public int IngredientId { get; set; }
        public decimal Quantity { get; set; } // Original purchased amount
        public decimal RemainingQuantity { get; set; }  // Updated during usage
        public decimal CostPerUnit { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string BatchNumber { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public IngredientDTO? Ingredient { get; set; }
        public ICollection<InventoryTransactionDTO>? InventoryTransactions { get; set; }

    }
}
