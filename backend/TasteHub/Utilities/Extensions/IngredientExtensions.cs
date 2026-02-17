using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.MenuItemIngredient;
using TasteHub.DTOs.Size;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Utilities.Extensions
{
    public static class IngredientExtensions
    {

        public static IngredientDTO ToDTO(this Ingredient entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new IngredientDTO
            {
                Id = entity.Id,
                NameEn = entity.NameEn,
                NameAr = entity.NameAr,
                Unit = entity.Unit,
                LowStockThreshold = entity.LowStockThreshold,
                SupplierId = entity.SupplierId,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                CurrentStock = entity.CurrentStock,
            };
        }

        public static Ingredient ToEntity(this IngredientDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Ingredient
            {
                Id = DTO.Id ?? default,
                NameEn = DTO.NameEn,
                NameAr = DTO.NameAr,
                Unit = DTO.Unit,
                LowStockThreshold = DTO.LowStockThreshold,
                SupplierId = DTO.SupplierId,
            };
        }

        public static void UpdateFromDTO(this Ingredient entity, IngredientDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.NameEn = DTO.NameEn;
            entity.NameAr = DTO.NameAr;
            entity.Unit = DTO.Unit;
            entity.LowStockThreshold = DTO.LowStockThreshold;

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
