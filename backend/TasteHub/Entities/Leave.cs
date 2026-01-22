using System.ComponentModel.DataAnnotations;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Leave
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        [Required]
        public byte TotalDays { get; set; }

        [Required]
        public int LeaveTypeId { get; set; }

        [Required]
        public LeaveStatus LeaveStatus { get; set; }

        public string? Reason { get; set; }
        public string? AdditionalNotes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public User? User { get; set; } = null!;
        public LeaveType? LeaveType { get; set; } = null!;
    }
}
