using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Employee;
using TasteHub.Enums;

namespace TasteHub.DTOs.Payroll
{
    public class PayrollDTO
    {
        public int? Id { get; set; }
        public int EmployeeId { get; set; }
        //public DateOnly PayrollDate { get; set; }
        [Range(1, 12)]
        public byte PayrollMonth { get; set; } // 1–12
        [Range(2000, 2100)]
        public short PayrollYear { get; set; } // e.g., 2026
        public decimal BaseSalary { get; set; }
        public decimal ProratedSalary { get; set; }
        public decimal Allowances { get; set; }
        public decimal Overtime { get; set; }
        public decimal Deductions { get; set; }
        public decimal NetSalary { get; set; }
        public string? AdditionalNotes { get; set; }

        public PayrollStatus PayrollStatus { get; set; } = PayrollStatus.Draft;
        public DateTime? PaidAt { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public EmployeeDTO? Employee { get; set; } = null!;
    }
}
