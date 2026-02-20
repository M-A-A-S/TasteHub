using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.DTOs.LeaveType
{
    public class LeaveTypeDTO
    {
        public int? Id { get; set; }
        public string NameEn { get; set; } = null!; // "Sick", "Annual", etc.
        public string NameAr { get; set; } = null!;
        public bool IsPaid { get; set; } = true;
        public int DefaultDaysPerYear { get; set; } = 0;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
