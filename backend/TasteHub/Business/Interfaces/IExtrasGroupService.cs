using TasteHub.DTOs.ExtraGroup;
using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IExtrasGroupService
    {
        Task<Result<IEnumerable<ExtraGroupResponseDTO>>> GetAllAsync();
        Task<Result<ExtrasGroup>> GetByIdAsync(int id);
        Task<Result<ExtrasGroup>> AddAsync(ExtraGroupDTO extrasGroupDTO);
        Task<Result<ExtrasGroup>> UpdateAsync(int id, ExtraGroupDTO extrasGroupDTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
