using TasteHub.DTOs.JobTitle;
using TasteHub.DTOs.ShiftType;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IShiftTypeService
    {
        Task<Result<ShiftTypeDTO>> AddAsync(ShiftTypeDTO dto);
        Task<Result<ShiftTypeDTO>> UpdateAsync(int id, ShiftTypeDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<ShiftTypeDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<ShiftTypeDTO>>> GetAllAsync();
    }
}
