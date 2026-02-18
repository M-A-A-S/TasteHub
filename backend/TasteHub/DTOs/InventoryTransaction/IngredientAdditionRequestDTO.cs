using TasteHub.Enums;

namespace TasteHub.DTOs.InventoryTransaction
{
    public class IngredientAdditionRequestDTO
    {
        public IEnumerable<IngredientAdditionDTO> Additions { get; set; }
        public StockMovementReason Reason { get; set; } = StockMovementReason.Purchase;
    }
}
