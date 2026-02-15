using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.DTOs.MenuItemIngredient;
using TasteHub.DTOs.User;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Utilities.Extensions
{
    public static class InventoryTransactionExtensions
    {
        public static InventoryTransactionDTO ToDTO(this InventoryTransaction entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new InventoryTransactionDTO
            {
                Id = entity.Id,
                IngredientBatchId = entity.IngredientBatchId,
                StockMovementType = entity.StockMovementType,
                Quantity = entity.Quantity,
                UserId = entity.UserId,
                StockMovementReason = entity.StockMovementReason,
                InventoryTransactionDate = entity.InventoryTransactionDate,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
            };
        }

        public static InventoryTransaction ToEntity(this InventoryTransactionDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new InventoryTransaction
            {
                Id = DTO.Id ?? default,
                IngredientBatchId = DTO.IngredientBatchId,
                StockMovementType = DTO.StockMovementType,
                Quantity = DTO.Quantity,
                UserId = DTO.UserId,
                StockMovementReason = DTO.StockMovementReason,
                InventoryTransactionDate = DTO.InventoryTransactionDate,
            };
        }

        public static void UpdateFromDTO(this InventoryTransaction entity, InventoryTransactionDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.IngredientBatchId = DTO.IngredientBatchId;
            entity.StockMovementType = DTO.StockMovementType;
            entity.Quantity = DTO.Quantity;
            entity.UserId = DTO.UserId;
            entity.StockMovementReason = DTO.StockMovementReason;
            entity.InventoryTransactionDate = DTO.InventoryTransactionDate;

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
