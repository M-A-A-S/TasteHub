using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Leave
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        [Required]
        public byte TotalDays { get; set; }

        [Required]
        public int LeaveTypeId { get; set; }

        [Required]
        public LeaveStatus LeaveStatus { get; set; } = LeaveStatus.Pending;
        public int? ApprovedByEmployeeId { get; set; }

        public DateTime? ApprovedAt { get; set; }

        public string? Reason { get; set; }
        public string? AdditionalNotes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(EmployeeId))]
        [InverseProperty("Leaves")]
        public Employee Employee { get; set; } = null!;

        [ForeignKey(nameof(ApprovedByEmployeeId))]
        [InverseProperty("ApprovedLeaves")]
        public Employee? ApprovedBy { get; set; }
        public LeaveType LeaveType { get; set; } = null!;
    }
}
