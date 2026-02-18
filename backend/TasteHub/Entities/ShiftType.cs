using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class ShiftType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string ShiftNameEn { get; set; } = null!;

        [Required]
        [StringLength(100)]
        [Column(TypeName = "nvarchar(100)")]
        public string ShiftNameAr { get; set; } = null!;

        [Required]
        public TimeOnly StartTime { get; set; }

        [Required]
        public TimeOnly EndTime { get; set; }
        public int BreakMinutes { get; set; } = 0;

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
