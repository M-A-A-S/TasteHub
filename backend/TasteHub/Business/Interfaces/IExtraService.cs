using TasteHub.DTOs.Extra;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IExtraService
    {
        Task<Result<IEnumerable<ExtraDTO>>> GetAllAsync();
        Task<Result<IEnumerable<ExtraDTO>>> GetByIdsAsync(List<int> ids);
        Task<Result<ExtraDTO>> GetByIdAsync(int id);
        Task<Result<ExtraDTO>> AddAsync(ExtraDTO extraDTO);
        Task<Result<ExtraDTO>> UpdateAsync(int id, ExtraDTO extraDTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
