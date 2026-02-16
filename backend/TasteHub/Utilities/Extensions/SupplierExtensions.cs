using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.Person;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class SupplierExtensions
    {

        public static SupplierDTO ToDTO(this Supplier entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new SupplierDTO
            {
                Id = entity.Id,
                PersonId = entity.PersonId,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                Person = entity?.Person?.ToDTO()
            };
        }

        public static Supplier ToEntity(this SupplierDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Supplier
            {
                Id = DTO.Id ?? default,
                PersonId = DTO.PersonId ?? default,
                Person = DTO?.Person?.ToEntity(),
            };
        }

        public static void UpdateFromDTO(this Supplier entity, SupplierDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.PersonId = DTO.PersonId ?? default;
            entity.Person = DTO?.Person?.ToEntity();

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
