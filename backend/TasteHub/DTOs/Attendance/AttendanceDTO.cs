using System.ComponentModel.DataAnnotations;
using TasteHub.DTOs.Employee;
using TasteHub.DTOs.WorkSchedule;
using TasteHub.Enums;

namespace TasteHub.DTOs.Attendance
{
    public class AttendanceDTO
    {
        public int? Id { get; set; }
        public int EmployeeId { get; set; }
        public int WorkScheduleId { get; set; }
        public DateOnly AttendanceDate { get; set; }
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public int LateMinutes { get; set; } = 0;
        public int OvertimeMinutes { get; set; } = 0;
        public AttendanceStatus AttendanceStatus { get; set; }
        public bool IsApproved { get; set; } = false;
        public string? AdditionalNotes { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public EmployeeDTO? Employee { get; set; } = null!;
        public WorkScheduleDTO? WorkSchedule { get; set; } = null!;
    }
}
