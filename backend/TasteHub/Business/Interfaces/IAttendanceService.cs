using TasteHub.DTOs.Attendance;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IAttendanceService
    {
        Task<Result<AttendanceDTO>> AddAsync(AttendanceDTO dto);
        Task<Result<AttendanceDTO>> UpdateAsync(int id, AttendanceDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<AttendanceDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<AttendanceDTO>>> GetAllAsync();
    }
}
