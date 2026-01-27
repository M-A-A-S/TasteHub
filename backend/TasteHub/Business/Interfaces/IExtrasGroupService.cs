using TasteHub.DTOs.ExtraGroup;
using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IExtrasGroupService
    {
        Task<Result<IEnumerable<ExtraGroupDTO>>> GetAllAsync();
        Task<Result<ExtraGroupDTO>> GetByIdAsync(int id);
        Task<Result<ExtraGroupDTO>> AddAsync(ExtraGroupDTO extrasGroupDTO);
        Task<Result<ExtraGroupDTO>> UpdateAsync(int id, ExtraGroupDTO extrasGroupDTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
