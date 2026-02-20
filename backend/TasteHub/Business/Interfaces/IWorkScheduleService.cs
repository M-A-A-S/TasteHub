using TasteHub.DTOs.WorkSchedule;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IWorkScheduleService
    {
        Task<Result<WorkScheduleDTO>> AddAsync(WorkScheduleDTO dto);
        Task<Result<WorkScheduleDTO>> UpdateAsync(int id, WorkScheduleDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<WorkScheduleDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<WorkScheduleDTO>>> GetAllAsync();
    }
}
