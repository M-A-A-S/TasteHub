using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        //  Required: Every employee is a person
        [Required]
        public int PersonId { get; set; }

        // Optional: Only if employee has system access
        public int? UserId { get; set; }

        [Required]
        public DateOnly HireDate { get; set; }

        public DateOnly? TerminationDate { get; set; }

        [Required]
        public int JobTitleId { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal BaseSalary { get; set; }

        public EmploymentStatus EmploymentStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Person Person { get; set; } = null;
        public User? User { get; set; }
        public JobTitle JobTitle { get; set; } = null;

        public ICollection<Attendance>? Attendances { get; set; }
        [InverseProperty("Employee")]
        public ICollection<Leave>? Leaves { get; set; }
        [InverseProperty("ApprovedBy")]
        public ICollection<Leave>? ApprovedLeaves { get; set; }
        public ICollection<Payroll>? Payrolls { get; set; }
        public ICollection<WorkSchedule>? WorkSchedules { get; set; }
    }
}
