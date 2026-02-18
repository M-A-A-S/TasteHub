using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class Payroll
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public DateOnly PayrollDate { get; set; }

        [Required]
        [Range(1, 12)]
        public byte PayrollMonth { get; set; } // 1–12

        [Required]
        [Range(2000, 2100)]
        public short PayrollYear { get; set; } // e.g., 2026

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal BaseSalary { get; set; }

        public decimal Allowances { get; set; }
        public decimal Overtime { get; set; }
        public decimal Deductions { get; set; }
        public decimal NetSalary { get; set; }

        public string? AdditionalNotes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Employee Employee { get; set; } = null!;
    }
}
