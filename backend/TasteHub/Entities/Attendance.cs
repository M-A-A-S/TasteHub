using System.ComponentModel.DataAnnotations;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public int WorkScheduleId { get; set; }

        [Required]
        public DateOnly AttendanceDate { get; set; }

        public DateTime? CheckIn { get; set; }

        public DateTime? CheckOut { get; set; }

        public int LateMinutes { get; set; } = 0;

        public int OvertimeMinutes { get; set; } = 0;

        [Required]
        public AttendanceStatus AttendanceStatus { get; set; }

        public bool IsApproved { get; set; } = false;

        public string? AdditionalNotes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Employee Employee { get; set; } = null!;
        public WorkSchedule WorkSchedule { get; set; } = null!;
    }
}
