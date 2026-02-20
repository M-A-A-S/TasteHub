using TasteHub.DTOs.LeaveType;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class LeaveTypeExtensions
    {
        public static LeaveTypeDTO ToDTO(this LeaveType entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new LeaveTypeDTO
            {
                Id = entity.Id,
                NameEn = entity.NameEn,
                NameAr = entity.NameAr,
                IsPaid = entity.IsPaid,
                DefaultDaysPerYear = entity.DefaultDaysPerYear,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
            };
        }

        public static LeaveType ToEntity(this LeaveTypeDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new LeaveType
            {
                Id = DTO.Id ?? default,
                NameEn = DTO.NameEn,
                NameAr = DTO?.NameAr,
                IsPaid = DTO.IsPaid,
                DefaultDaysPerYear = DTO.DefaultDaysPerYear,
            };
        }

        public static void UpdateFromDTO(this LeaveType entity, LeaveTypeDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.NameEn = DTO.NameEn;
            entity.NameAr = DTO.NameAr;
            entity.IsPaid = DTO.IsPaid;
            entity.DefaultDaysPerYear = DTO.DefaultDaysPerYear;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
