using System.ComponentModel.DataAnnotations;

namespace TasteHub.Entities
{
    public class WorkSchedule
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public int ShiftTypeId { get; set; }

        [Required]
        public DayOfWeek DayOfWeek { get; set; }

        //[Required]
        //public TimeOnly StartTime { get; set; }

        //[Required]
        //public TimeOnly EndTime { get; set; }

        public bool IsActive { get; set; } = true;

        public string? AdditionalNotes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Employee Employee { get; set; } = null!;
        public ShiftType ShiftType { get; set; } = null!;

    }
}
