using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Employee;
using TasteHub.DTOs.LeaveType;
using TasteHub.Enums;

namespace TasteHub.DTOs.Leave
{
    public class LeaveDTO
    {
        public int? Id { get; set; }
        public int EmployeeId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public byte TotalDays { get; set; }
        public int LeaveTypeId { get; set; }
        public LeaveStatus LeaveStatus { get; set; } = LeaveStatus.Pending;
        public int? ApprovedByEmployeeId { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public bool? IsApprove { get; set; }
        public string? Reason { get; set; }
        public string? AdditionalNotes { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public EmployeeDTO? Employee { get; set; } = null!;
        public EmployeeDTO? ApprovedBy { get; set; }
        public LeaveTypeDTO? LeaveType { get; set; } = null!;
    }
}
