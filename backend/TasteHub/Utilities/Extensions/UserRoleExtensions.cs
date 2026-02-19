using TasteHub.DTOs.Role;
using TasteHub.DTOs.Supplier;
using TasteHub.DTOs.User;
using TasteHub.DTOs.UserRole;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class UserRoleExtensions
    {
        public static UserRoleDTO ToDTO(this UserRole entity)
        {
            if (entity == null)
            {
                return null;
            }


            return new UserRoleDTO
            {
                Id = entity.Id,
                RoleId = entity.RoleId,
                UserId = entity.UserId,
                IsActive = entity.IsActive,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                Role = entity?.Role?.ToDTO(),
                User = entity?.User?.ToDTO(),
            };
        }

        public static UserRole ToEntity(this UserRoleDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new UserRole
            {
                Id = DTO.Id ?? default,
                RoleId = DTO.RoleId,
                //UserId = DTO.UserId,
                IsActive = DTO.IsActive ?? true,
            };
        }

        public static void UpdateFromDTO(this UserRole entity, UserRoleDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.RoleId = DTO.RoleId;
            //entity.UserId = DTO.UserId;
            entity.IsActive = DTO.IsActive ?? true;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
