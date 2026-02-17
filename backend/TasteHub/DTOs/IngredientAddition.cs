namespace TasteHub.DTOs
{
    public class IngredientAddition
    {
        public int IngredientId { get; set; }
        public decimal Quantity { get; set; }
        public decimal CostPerUnit { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string BatchNumber { get; set; } = null!;
    }
}
