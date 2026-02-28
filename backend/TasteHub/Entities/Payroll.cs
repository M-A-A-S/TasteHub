using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class Payroll
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        //[Required]
        //public DateOnly PayrollDate { get; set; }

        [Required]
        [Range(1, 12)]
        public byte PayrollMonth { get; set; } // 1–12

        [Required]
        [Range(2000, 2100)]
        public short PayrollYear { get; set; } // e.g., 2026

        // Contract Salary
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal BaseSalary { get; set; }

        // Actual Calculated Salary
        [Column(TypeName = "decimal(18,2)")]
        public decimal ProratedSalary { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Allowances { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Overtime { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Deductions { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal NetSalary { get; set; }

        public string? AdditionalNotes { get; set; }

        public PayrollStatus PayrollStatus { get; set; } = PayrollStatus.Draft;
        public DateTime? PaidAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Employee Employee { get; set; } = null!;
    }
}
