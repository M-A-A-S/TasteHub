using TasteHub.DTOs.Employee;
using TasteHub.DTOs.Supplier;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IEmployeeService
    {
        Task<Result<EmployeeDTO>> AddAsync(EmployeeDTO dto);
        Task<Result<EmployeeDTO>> UpdateAsync(int id, EmployeeDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<EmployeeDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<EmployeeDTO>>> GetAllAsync();

    }
}
