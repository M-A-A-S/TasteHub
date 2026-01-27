using TasteHub.DTOs.MenuCategory;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class MenuItemSizeExtensions
    {

        public static MenuItemSizeDTO ToDTO(this MenuItemSize menuItemSize)
        {
            if (menuItemSize == null)
            {
                return null;
            }

            return new MenuItemSizeDTO
            {
                Id = menuItemSize.Id,
                MenuItemId = menuItemSize.MenuItemId,
                SizeId = menuItemSize.SizeId,
                Price = menuItemSize.Price,
                CreatedAt = menuItemSize.CreatedAt,
                UpdatedAt = menuItemSize.UpdatedAt,
                MenuItem = menuItemSize?.MenuItem?.ToDTO() ?? null,
                Size = menuItemSize?.Size?.ToDTO() ?? null
            };
        }

        public static MenuItemSize ToEntity(this MenuItemSizeDTO menuItemSizeDTO)
        {
            if (menuItemSizeDTO == null)
            {
                return null;
            }

            return new MenuItemSize
            {
                Id = menuItemSizeDTO.Id ?? default,
                MenuItemId = menuItemSizeDTO.MenuItemId,
                SizeId = menuItemSizeDTO.SizeId, 
                Price = menuItemSizeDTO.Price,
            };
        }

        public static void UpdateFromDTO(this MenuItemSize menuItemSize, MenuItemSizeDTO menuItemSizeDTO)
        {

            if (menuItemSize == null || menuItemSizeDTO == null)
            {
                return;
            }

            menuItemSize.Price = menuItemSizeDTO.Price;
            menuItemSize.UpdatedAt = DateTime.UtcNow;
        }

    }
}
