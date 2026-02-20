using TasteHub.DTOs.LeaveType;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface ILeaveTypeService
    {
        Task<Result<LeaveTypeDTO>> AddAsync(LeaveTypeDTO dto);
        Task<Result<LeaveTypeDTO>> UpdateAsync(int id, LeaveTypeDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<LeaveTypeDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<LeaveTypeDTO>>> GetAllAsync();
    }
}
