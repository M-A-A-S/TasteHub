using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.MenuItem;

namespace TasteHub.DTOs.MenuItemIngredient
{
    public class MenuItemIngredientDTO
    {
        public int? Id { get; set; }
        public int MenuItemId { get; set; }
        public int IngredientId { get; set; }
        public decimal QuantityPerUnit { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public MenuItemDTO? MenuItem { get; set; }
        public IngredientDTO? Ingredient { get; set; }
    }
}
