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
                IsConfirmed = entity.IsConfirmed,
                Password = entity.Password,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                Person = entity?.Person?.ToDTO(),
                Roles = entity.Roles.Select(r => new UserRoleDTO
                {
                    Id = r.Id,
                    RoleId = r.RoleId,
                    UserId = r.UserId,
                    Role = r.Role.ToDTO(),
                }).ToList()
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
                IsConfirmed = DTO.IsConfirmed,
                Password = DTO.Password,
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
            entity.Password = DTO.Password;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
