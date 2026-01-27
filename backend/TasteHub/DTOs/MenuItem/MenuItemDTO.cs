using TasteHub.DTOs.MenuCategory;

namespace TasteHub.DTOs.MenuItem
{
    public class MenuItemDTO
    {
        public int? Id { get; set; }
        public string NameEn { get; set; } = null!;
        public string NameAr { get; set; } = null!;
        public string? DescriptionEn { get; set; }
        public string? DescriptionAr { get; set; }
        public int MenuCategoryId { get; set; }
        public decimal Price { get; set; }
        public IFormFile? ImageFile { get; set; } // uploaded file
        public string? ImageUrl { get; set; } // stored filename
        public bool IsActive { get; set; } = true;
        public bool DeleteImage { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public MenuCategoryDTO? MenuCategory { get; set; } = null;
    }
}
