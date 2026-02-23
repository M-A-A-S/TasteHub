using TasteHub.DTOs.Leave;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface ILeaveService
    {
        Task<Result<LeaveDTO>> AddAsync(LeaveDTO dto);
        Task<Result<LeaveDTO>> UpdateAsync(int id, LeaveDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<LeaveDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<LeaveDTO>>> GetAllAsync();
        Task<Result<bool>> CreateLeaveAsync(LeaveDTO dto);
        Task<Result<bool>> ApproveLeaveAsync(LeaveDTO dto);
        Task<Result<bool>> CancelLeaveAsync(int leaveId);
    }
}
