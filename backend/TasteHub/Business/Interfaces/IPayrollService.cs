using TasteHub.DTOs.Payroll;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IPayrollService
    {
        Task<Result<PayrollDTO>> AddAsync(PayrollDTO dto);
        Task<Result<PayrollDTO>> UpdateAsync(int id, PayrollDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<PayrollDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<PayrollDTO>>> GetAllAsync(PayrollFiltersDTO filters);
        Task<Result<bool>> GeneratePayrollAsync(byte month, short year);
        Task<Result<bool>> ApprovePayrollAsync(int payrollId);
        Task<Result<bool>> MarkAsPaidAsync(int payrollId);
    }
}
