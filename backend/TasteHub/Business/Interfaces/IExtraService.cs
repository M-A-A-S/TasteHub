using TasteHub.DTOs.Extra;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IExtraService
    {
        Task<Result<IEnumerable<ExtraResponseDTO>>> GetAllAsync();
        Task<Result<Extra>> GetByIdAsync(int id);
        Task<Result<Extra>> AddAsync(ExtraDTO extraDTO);
        Task<Result<Extra>> UpdateAsync(int id, ExtraDTO extraDTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
