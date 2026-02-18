namespace TasteHub.DTOs.InventoryTransaction
{
    public class IngredientAdditionDTO
    {
        public int IngredientId { get; set; }
        public decimal Quantity { get; set; }
        public decimal CostPerUnit { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string BatchNumber { get; set; } = null!;
    }
}
