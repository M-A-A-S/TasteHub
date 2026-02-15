using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.MenuItemIngredient;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.DTOs.Ingredient
{
    public class IngredientDTO
    {
        public int? Id { get; set; }
        public string NameEn { get; set; } = null!;
        public string NameAr { get; set; } = null!;
        public IngredientUnit Unit { get; set; }
        public decimal LowStockThreshold { get; set; } // Minimum stock before alert triggers
        public int? SupplierId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public SupplierDTO? Supplier { get; set; }
        public ICollection<MenuItemIngredientDTO>? MenuItemIngredients { get; set; }
        public ICollection<IngredientBatchDTO>? IngredientBatches { get; set; }

    }
}
