using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class IngredientBatchExtensions
    {

        public static IngredientBatchDTO ToDTO(this IngredientBatch entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new IngredientBatchDTO
            {
                Id = entity.Id,
                IngredientId = entity.IngredientId,
                Quantity = entity.Quantity,
                RemainingQuantity = entity.RemainingQuantity,
                CostPerUnit = entity.CostPerUnit,
                ExpiryDate = entity.ExpiryDate,
                BatchNumber = entity.BatchNumber,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                Ingredient = new IngredientDTO
                {
                    Id = entity.Ingredient.Id,
                    NameEn = entity.Ingredient.NameEn,
                    NameAr = entity.Ingredient.NameAr,
                }
            };
        }

        public static IngredientBatch ToEntity(this IngredientBatchDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new IngredientBatch
            {
                Id = DTO.Id ?? default,
                IngredientId = DTO.IngredientId,
                Quantity = DTO.Quantity,
                RemainingQuantity = DTO.RemainingQuantity,
                CostPerUnit = DTO.CostPerUnit,
                ExpiryDate = DTO.ExpiryDate,
                BatchNumber = DTO.BatchNumber,
            };
        }

        public static void UpdateFromDTO(this IngredientBatch entity, IngredientBatchDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.IngredientId = DTO.IngredientId;
            entity.Quantity = DTO.Quantity;
            entity.RemainingQuantity = DTO.RemainingQuantity;
            entity.CostPerUnit = DTO.CostPerUnit;
            entity.ExpiryDate = DTO.ExpiryDate;

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
