using TasteHub.DTOs.Order;
using TasteHub.DTOs.Role;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class RoleExtensions
    {
        public static RoleDTO ToDTO(this Role entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new RoleDTO
            {
                Id = entity.Id,
                NameEn = entity.NameEn,
                NameAr = entity.NameAr,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };
        }

        public static Role ToEntity(this RoleDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Role
            {
                Id = DTO.Id ?? default,
                NameEn = DTO.NameEn,
                NameAr = DTO.NameAr,
                CreatedAt = DTO.CreatedAt,
                UpdatedAt = DTO.UpdatedAt
            };
        }

        public static void UpdateFromDTO(this Role entity, RoleDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.NameEn = DTO?.NameEn;
            entity.NameAr = DTO?.NameAr;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
