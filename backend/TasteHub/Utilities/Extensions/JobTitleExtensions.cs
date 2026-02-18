using TasteHub.DTOs.JobTitle;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class JobTitleExtensions
    {

        public static JobTitleDTO ToDTO(this JobTitle entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new JobTitleDTO
            {
                Id = entity.Id,
                NameEn = entity.NameEn,
                NameAr = entity.NameAr,
            };
        }

        public static JobTitle ToEntity(this JobTitleDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new JobTitle
            {
                Id = DTO.Id ?? default,
                NameEn = DTO.NameEn,
                NameAr = DTO?.NameAr,
            };
        }

        public static void UpdateFromDTO(this JobTitle entity, JobTitleDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.NameEn = DTO.NameEn;
            entity.NameAr = DTO?.NameAr;

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
