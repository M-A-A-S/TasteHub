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
        Task<Result<IEnumerable<PayrollDTO>>> GetAllAsync();
    }
}
