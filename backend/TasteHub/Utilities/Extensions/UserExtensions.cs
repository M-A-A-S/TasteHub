using TasteHub.DTOs.Person;
using TasteHub.DTOs.Supplier;
using TasteHub.DTOs.User;
using TasteHub.DTOs.UserRole;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class UserExtensions
    {
        public static UserDTO ToDTO(this User entity)
        {
            if (entity == null)
            {
                return null;
            }


            return new UserDTO
            {
                Id = entity.Id,
                PersonId = entity.PersonId,
                Email = entity.Email,
                Username = entity.Username,
                IsConfirmed = entity.IsConfirmed,
                IsActive = entity.IsActive,
                Password = entity.Password,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                Person = entity?.Person?.ToDTO(),
                Roles = entity.Roles?.Select(r => new UserRoleDTO
                {
                    Id = r.Id,
                    RoleId = r.RoleId,
                    UserId = r.UserId,
                    Role = r.Role.ToDTO(),
                }).ToList() ?? new List<UserRoleDTO>()
            };
        }

        public static PublicUserDTO ToPublicDTO(this User entity)
        {
            if (entity == null)
            {
                return null;
            }


            return new PublicUserDTO
            {
                Id = entity.Id,
                PersonId = entity.PersonId,
                Email = entity.Email,
                Username = entity.Username,
                IsConfirmed = entity.IsConfirmed,
                IsActive = entity.IsActive,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                Person = entity?.Person?.ToDTO(),
                Roles = entity.Roles?.Select(r => new UserRoleDTO
                {
                    Id = r.Id,
                    RoleId = r.RoleId,
                    UserId = r.UserId,
                    Role = r.Role.ToDTO(),
                }).ToList() ?? new List<UserRoleDTO>()
            };
        }

        public static User ToEntity(this UserDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new User
            {
                Id = DTO.Id ?? default,
                PersonId = DTO.PersonId ?? default,
                Person = DTO?.Person?.ToEntity(),
                Email = DTO.Email,
                Username = DTO.Username,
                IsConfirmed = DTO.IsConfirmed,
                IsActive = DTO.IsActive,
                Password = DTO?.Password,
            };
        }

        public static void UpdateFromDTO(this User entity, UserDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.PersonId = DTO.PersonId ?? default;
            entity.Person = DTO?.Person?.ToEntity();
            entity.Email = DTO.Email;
            entity.IsConfirmed = DTO.IsConfirmed;
            if (entity.Password != null)
            {
                entity.Password = DTO.Password;
            }
            

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
