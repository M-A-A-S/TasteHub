using TasteHub.DTOs.JobTitle;
using TasteHub.DTOs.ShiftType;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class ShiftTypeExtensions
    {

        public static ShiftTypeDTO ToDTO(this ShiftType entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new ShiftTypeDTO
            {
                Id = entity.Id,
                ShiftNameEn = entity.ShiftNameEn,
                ShiftNameAr = entity.ShiftNameAr,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
                BreakMinutes = entity.BreakMinutes,
                Description = entity.Description,
            };
        }

        public static ShiftType ToEntity(this ShiftTypeDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new ShiftType
            {
                Id = DTO.Id ?? default,
                ShiftNameEn = DTO.ShiftNameEn,
                ShiftNameAr = DTO.ShiftNameAr,
                StartTime = DTO.StartTime,
                EndTime = DTO.EndTime,
                BreakMinutes = DTO.BreakMinutes,
                Description = DTO.Description,
            };
        }

        public static void UpdateFromDTO(this ShiftType entity, ShiftTypeDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.ShiftNameEn = DTO.ShiftNameEn;
            entity.ShiftNameAr = DTO.ShiftNameAr;
            entity.StartTime = DTO.StartTime;
            entity.EndTime = DTO.EndTime;
            entity.BreakMinutes = DTO.BreakMinutes;
            entity.Description = DTO.Description;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
