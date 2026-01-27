using TasteHub.DTOs.MenuItem;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class MenuItemExtensions
    {
        public static MenuItemDTO ToDTO(this MenuItem item)
        {
            if (item == null) return null!;

            return new MenuItemDTO
            {
                Id = item.Id,
                NameEn = item.NameEn,
                NameAr = item.NameAr,
                DescriptionEn = item.DescriptionEn,
                DescriptionAr = item.DescriptionAr,
                MenuCategoryId = item.MenuCategoryId,
                Price = item.Price,
                ImageUrl = item.ImageUrl,
                IsActive = item.IsActive,
                CreatedAt = item.CreatedAt,
                UpdatedAt = item.UpdatedAt,
                MenuCategory = item.MenuCategory.ToDTO(),
            };
        }

        public static MenuItem ToEntity(this MenuItemDTO dto)
        {
            if (dto == null) return null!;
            return new MenuItem
            {
                Id = dto.Id ?? 0,
                NameEn = dto.NameEn,
                NameAr = dto.NameAr,
                DescriptionEn = dto.DescriptionEn,
                DescriptionAr = dto.DescriptionAr,
                MenuCategoryId = dto.MenuCategoryId,
                Price = dto.Price,
                ImageUrl = dto.ImageUrl,
                IsActive = dto.IsActive
            };
        }

        public static void UpdateFromDTO(this MenuItem item, MenuItemDTO dto)
        {
            if (item == null || dto == null) return;

            item.NameEn = dto.NameEn;
            item.NameAr = dto.NameAr;
            item.DescriptionEn = dto.DescriptionEn;
            item.DescriptionAr = dto.DescriptionAr;
            item.MenuCategoryId = dto.MenuCategoryId;
            item.Price = dto.Price;
            if (!string.IsNullOrEmpty(dto.ImageUrl))
            {
                item.ImageUrl = dto.ImageUrl;
            }
            item.IsActive = dto.IsActive;
            item.UpdatedAt = DateTime.UtcNow;
        }

    }
}
