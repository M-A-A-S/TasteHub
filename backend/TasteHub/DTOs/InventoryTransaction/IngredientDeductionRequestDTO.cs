using TasteHub.Enums;

namespace TasteHub.DTOs.InventoryTransaction
{
    public class IngredientDeductionRequestDTO
    {
        public IEnumerable<IngredientDeductionDTO> Deductions { get; set; }
        public StockMovementReason Reason { get; set; } = StockMovementReason.Sale;
    }
}
