using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class MenuItemIngredient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MenuItemId { get; set; }

        [Required]
        public int IngredientId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal QuantityPerUnit { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public MenuItem? MenuItem { get; set; }
        public Ingredient? Ingredient { get; set; }
    }
}
