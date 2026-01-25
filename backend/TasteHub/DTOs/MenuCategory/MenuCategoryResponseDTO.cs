namespace TasteHub.DTOs.MenuCategory
{
    public class MenuCategoryResponseDTO
    {
        public int Id { get; set; }
        public string NameEn { get; set; } = null!;
        public string NameAr { get; set; } = null!;
        public string? DescriptionEn { get; set; }
        public string? DescriptionAr { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<MenuCategoryResponseDTO>? MenuItems { get; set; }
    }
}
