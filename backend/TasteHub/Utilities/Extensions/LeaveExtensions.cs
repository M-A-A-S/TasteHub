using TasteHub.DTOs.Employee;
using TasteHub.DTOs.Leave;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Utilities.Extensions
{
    public static class LeaveExtensions
    {
        public static LeaveDTO ToDTO(this Leave entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new LeaveDTO
            {
                Id = entity.Id,
                EmployeeId = entity.EmployeeId,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                TotalDays = entity.TotalDays,
                LeaveTypeId = entity.LeaveTypeId,
                LeaveStatus = entity.LeaveStatus,
                ApprovedByEmployeeId = entity.ApprovedByEmployeeId,
                ApprovedAt = entity.ApprovedAt,
                Reason = entity.Reason,
                AdditionalNotes = entity.AdditionalNotes,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                LeaveType = entity.LeaveType.ToDTO(),
                Employee = new EmployeeDTO
                {
                    Id = entity?.Employee.Id,
                    EmploymentStatus = entity.Employee.EmploymentStatus,
                    HireDate = entity.Employee.HireDate,
                    TerminationDate = entity.Employee.TerminationDate,
                    BaseSalary = entity.Employee.BaseSalary,
                    Person = entity.Employee.Person.ToDTO(),
                }
            };
        }

        public static Leave ToEntity(this LeaveDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Leave
            {
                Id = DTO.Id ?? default,
                EmployeeId = DTO.EmployeeId,
                StartDate = DTO.StartDate,
                EndDate = DTO.EndDate,
                TotalDays = DTO.TotalDays,
                LeaveTypeId = DTO.LeaveTypeId,
                LeaveStatus = DTO.LeaveStatus,
                ApprovedByEmployeeId = DTO.ApprovedByEmployeeId,
                ApprovedAt = DTO.ApprovedAt,
                Reason = DTO.Reason,
                AdditionalNotes = DTO.AdditionalNotes,
            };
        }

        public static void UpdateFromDTO(this Leave entity, LeaveDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.EmployeeId = DTO.EmployeeId;
            entity.StartDate = DTO.StartDate;
            entity.EndDate = DTO.EndDate;
            entity.TotalDays = DTO.TotalDays;
            entity.LeaveTypeId = DTO.LeaveTypeId;
            entity.LeaveStatus = DTO.LeaveStatus;
            entity.ApprovedByEmployeeId = DTO.ApprovedByEmployeeId;
            entity.ApprovedAt = DTO.ApprovedAt;
            entity.Reason = DTO.Reason;
            entity.AdditionalNotes = DTO.AdditionalNotes;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
