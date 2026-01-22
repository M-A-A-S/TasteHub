using System.ComponentModel.DataAnnotations;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int WorkScheduleId { get; set; }

        [Required]
        public DateOnly AttendanceDate { get; set; }

        [Required]
        public TimeOnly? CheckIn { get; set; }

        [Required]
        public TimeOnly? CheckOut { get; set; }

        [Required]
        public string? AdditionalNotes { get; set; }

        [Required]
        public AttendanceStatus AttendanceStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public User User { get; set; } = null!;
        public WorkSchedule WorkSchedule { get; set; } = null!;
    }
}
