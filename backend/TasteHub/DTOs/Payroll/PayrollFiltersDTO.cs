using System.ComponentModel.DataAnnotations;

namespace TasteHub.DTOs.Payroll
{
    public class PayrollFiltersDTO
    {
        [Range(1, 12)]
        public byte PayrollMonth { get; set; } // 1–12
        [Range(2000, 2100)]
        public short PayrollYear { get; set; } // e.g., 2026
    }
}
