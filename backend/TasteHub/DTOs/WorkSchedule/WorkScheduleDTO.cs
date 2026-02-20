using System.ComponentModel.DataAnnotations;
using TasteHub.DTOs.Employee;
using TasteHub.DTOs.ShiftType;

namespace TasteHub.DTOs.WorkSchedule
{
    public class WorkScheduleDTO
    {
        public int? Id { get; set; }
        public int EmployeeId { get; set; }
        public int ShiftTypeId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public bool IsActive { get; set; } = true;
        public string? AdditionalNotes { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public EmployeeDTO? Employee { get; set; } = null!;
        public ShiftTypeDTO? ShiftType { get; set; } = null!;
    }
}
