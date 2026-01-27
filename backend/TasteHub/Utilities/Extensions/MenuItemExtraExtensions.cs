using TasteHub.DTOs.MenuItemExtra;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class MenuItemExtraExtensions
    {

        public static MenuItemExtraDTO ToDTO(this MenuItemExtra entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new MenuItemExtraDTO
            {
                Id = entity.Id,
                MenuItemId = entity.MenuItemId,
                ExtrasGroupId = entity.ExtrasGroupId,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                MenuItem = entity?.MenuItem?.ToDTO(),
                ExtrasGroup = entity?.ExtrasGroup?.ToDTO(),
            };
        }

        public static MenuItemExtra ToEntity(this MenuItemExtraDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new MenuItemExtra
            {
                Id = DTO.Id ?? default,
                MenuItemId = DTO.MenuItemId,
                ExtrasGroupId = DTO.ExtrasGroupId
            };
        }

        public static void UpdateFromDTO(this MenuItemExtra entity, MenuItemExtraDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.MenuItemId = DTO.MenuItemId;
            entity.ExtrasGroupId = DTO.ExtrasGroupId;

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
