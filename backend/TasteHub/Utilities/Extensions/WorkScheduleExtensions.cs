using TasteHub.DTOs.Employee;
using TasteHub.DTOs.JobTitle;
using TasteHub.DTOs.WorkSchedule;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class WorkScheduleExtensions
    {
        public static WorkScheduleDTO ToDTO(this WorkSchedule entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new WorkScheduleDTO
            {
                Id = entity.Id,
                EmployeeId = entity.EmployeeId,
                ShiftTypeId = entity.ShiftTypeId,
                DayOfWeek = entity.DayOfWeek,
                IsActive = entity.IsActive,
                AdditionalNotes = entity.AdditionalNotes,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                ShiftType = entity?.ShiftType?.ToDTO(),
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

        public static WorkSchedule ToEntity(this WorkScheduleDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new WorkSchedule
            {
                Id = DTO.Id ?? default,
                EmployeeId = DTO.EmployeeId,
                ShiftTypeId = DTO.ShiftTypeId,
                DayOfWeek = DTO.DayOfWeek,
                AdditionalNotes = DTO.AdditionalNotes,
                IsActive = DTO.IsActive,
            };
        }

        public static void UpdateFromDTO(this WorkSchedule entity, WorkScheduleDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.EmployeeId = DTO.EmployeeId;
            entity.ShiftTypeId = DTO.ShiftTypeId;
            entity.DayOfWeek = DTO.DayOfWeek;
            entity.AdditionalNotes = DTO.AdditionalNotes;
            entity.IsActive = DTO.IsActive;

            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
