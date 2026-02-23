using System.ComponentModel.DataAnnotations;

namespace TasteHub.Entities
{
    public class LeaveBalance
    {
        [Key]
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public int Year { get; set; }

        public int VacationBalance { get; set; } = 20;

        public int SickBalance { get; set; } = 10;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Employee Employee { get; set; }
    }
}
