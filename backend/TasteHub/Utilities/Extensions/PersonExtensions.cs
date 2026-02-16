using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.Person;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Utilities.Extensions
{
    public static class PersonExtensions
    {
        public static PersonDTO ToDTO(this Person entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new PersonDTO
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Phone = entity.Phone,
                ImageUrl = entity.ImageUrl,
                Gender = entity.Gender,
                DateOfBirth = entity.DateOfBirth,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
            };
        }

        public static Person ToEntity(this PersonDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Person
            {
                Id = DTO.Id ?? default,
                FirstName = DTO.FirstName,
                LastName = DTO.LastName,
                Phone = DTO.Phone,
                ImageUrl = DTO.ImageUrl,
                Gender = DTO.Gender,
                DateOfBirth = DTO.DateOfBirth,
            };
        }

        public static void UpdateFromDTO(this Person entity, PersonDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.FirstName = DTO.FirstName;
            entity.LastName = DTO.LastName;
            entity.Phone = DTO.Phone;
            entity.Gender = DTO.Gender;
            entity.DateOfBirth = DTO.DateOfBirth;
            if (!string.IsNullOrEmpty(DTO.ImageUrl))
            {
                entity.ImageUrl = DTO.ImageUrl;
            }

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
