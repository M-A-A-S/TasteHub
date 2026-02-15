using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.MenuItemIngredient;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class MenuItemIngredientExtensions
    {
        public static MenuItemIngredientDTO ToDTO(this MenuItemIngredient entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new MenuItemIngredientDTO
            {
                Id = entity.Id,
                MenuItemId = entity.MenuItemId,
                IngredientId = entity.IngredientId,
                QuantityPerUnit = entity.QuantityPerUnit,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
            };
        }

        public static MenuItemIngredient ToEntity(this MenuItemIngredientDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new MenuItemIngredient
            {
                Id = DTO.Id ?? default,
                MenuItemId = DTO.MenuItemId,
                IngredientId = DTO.IngredientId,
                QuantityPerUnit = DTO.QuantityPerUnit
            };
        }

        public static void UpdateFromDTO(this MenuItemIngredient entity, MenuItemIngredientDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.MenuItemId = DTO.MenuItemId;
            entity.IngredientId = DTO.IngredientId;
            entity.QuantityPerUnit = DTO.QuantityPerUnit;

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
