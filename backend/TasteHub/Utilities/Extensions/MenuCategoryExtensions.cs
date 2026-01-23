using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class MenuCategoryExtensions
    {
        public static MenuCategoryDTO ToDTO(this MenuCategory menuCategory)
        {
            if (menuCategory == null)
            {
                return null;
            }

            return new MenuCategoryDTO
            {
                Id = menuCategory.Id,
                NameEn = menuCategory.NameEn,
                NameAr = menuCategory.NameAr,
                DescriptionEn = menuCategory.DescriptionEn,
                DescriptionAr = menuCategory.DescriptionAr,
            };
        }
    
        public static MenuCategory ToEntity(this MenuCategoryDTO menuCategoryDTO)
        {
            if (menuCategoryDTO == null)
            {
                return null;
            }

            return new MenuCategory
            {
                Id = menuCategoryDTO.Id ?? default,
                NameEn = menuCategoryDTO.NameEn,
                NameAr = menuCategoryDTO.NameAr,
                DescriptionEn = menuCategoryDTO.DescriptionEn,
                DescriptionAr = menuCategoryDTO.DescriptionAr,
            };
        }
    
        public static void UpdateFromDTO(this MenuCategory menuCategory, MenuCategoryDTO menuCategoryDTO)
        {

            if (menuCategory == null || menuCategoryDTO == null)
            {
                return;
            }

            menuCategory.NameEn = menuCategoryDTO.NameEn;
            menuCategory.NameAr = menuCategoryDTO.NameAr;
            menuCategory.DescriptionEn = menuCategoryDTO.DescriptionEn ?? null;
            menuCategory.DescriptionAr = menuCategoryDTO.DescriptionAr ?? null;
            menuCategory.UpdatedAt = DateTime.UtcNow;
        }

    }
}
