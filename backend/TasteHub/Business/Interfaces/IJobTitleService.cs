using TasteHub.DTOs.Employee;
using TasteHub.DTOs.JobTitle;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IJobTitleService
    {
        Task<Result<JobTitleDTO>> AddAsync(JobTitleDTO dto);
        Task<Result<JobTitleDTO>> UpdateAsync(int id, JobTitleDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<JobTitleDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<JobTitleDTO>>> GetAllAsync();
    }
}
