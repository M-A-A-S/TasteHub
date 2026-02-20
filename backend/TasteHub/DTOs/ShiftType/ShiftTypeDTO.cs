using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.DTOs.ShiftType
{
    public class ShiftTypeDTO
    {
        public int? Id { get; set; }
        public string ShiftNameEn { get; set; } = null!;
        public string ShiftNameAr { get; set; } = null!;
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public int BreakMinutes { get; set; } = 0;
        public string? Description { get; set; }
    }
}
