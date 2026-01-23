using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TasteHub.Entities
{
    public class MenuItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string NameEn { get; set; } = null!;

        [Required]
        [StringLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string NameAr { get; set; } = null!;

        [Required]
        [StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string? DescriptionEn { get; set; }

        [Required]
        [StringLength(100)]
        [Column(TypeName = "nvarchar(100)")]
        public string? DescriptionAr { get; set; }

        [Required]
        public int MenuCategoryId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [StringLength(255)]
        [Column(TypeName = "varchar(255)")]
        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public MenuCategory? MenuCategory { get; set; }
        public ICollection<MenuItemSize>? MenuItemSizes { get; set; }
        public ICollection<MenuItemExtra>? MenuItemExtras { get; set; }
        public ICollection<MenuItemIngredient>? MenuItemIngredients { get; set; }
    }
}
