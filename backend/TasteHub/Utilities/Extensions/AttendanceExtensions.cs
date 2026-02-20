using TasteHub.DTOs.Attendance;
using TasteHub.DTOs.Employee;
using TasteHub.DTOs.WorkSchedule;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Utilities.Extensions
{
    public static class AttendanceExtensions
    {
        public static AttendanceDTO ToDTO(this Attendance entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new AttendanceDTO
            {
                Id = entity.Id,
                EmployeeId = entity.EmployeeId,
                WorkScheduleId = entity.WorkScheduleId,
                AttendanceDate = entity.AttendanceDate,
                CheckIn = entity.CheckIn,
                CheckOut = entity.CheckOut,
                LateMinutes = entity.LateMinutes,
                OvertimeMinutes = entity.OvertimeMinutes,
                AttendanceStatus = entity.AttendanceStatus,
                IsApproved = entity.IsApproved,
                AdditionalNotes = entity.AdditionalNotes,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
            };
        }

        public static Attendance ToEntity(this AttendanceDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Attendance
            {
                Id = DTO.Id ?? default,
                EmployeeId = DTO.EmployeeId,
                WorkScheduleId = DTO.WorkScheduleId,
                AttendanceDate = DTO.AttendanceDate,
                CheckIn = DTO.CheckIn,
                CheckOut = DTO.CheckOut,
                LateMinutes = DTO.LateMinutes,
                OvertimeMinutes = DTO.OvertimeMinutes,
                AttendanceStatus = DTO.AttendanceStatus,
                IsApproved = DTO.IsApproved,
                AdditionalNotes = DTO.AdditionalNotes,
            };
        }

        public static void UpdateFromDTO(this Attendance entity, AttendanceDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.EmployeeId = DTO.EmployeeId;
            entity.WorkScheduleId = DTO.WorkScheduleId;
            entity.AttendanceDate = DTO.AttendanceDate;
            entity.CheckIn = DTO.CheckIn;
            entity.CheckOut = DTO.CheckOut;
            entity.LateMinutes = DTO.LateMinutes;
            entity.OvertimeMinutes = DTO.OvertimeMinutes;
            entity.AttendanceStatus = DTO.AttendanceStatus;
            entity.IsApproved = DTO.IsApproved;
            entity.AdditionalNotes = DTO.AdditionalNotes;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
