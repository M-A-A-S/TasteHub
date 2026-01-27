using TasteHub.DTOs.Extra;
using TasteHub.DTOs.Size;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface ISizeService
    {

        Task<Result<IEnumerable<SizeDTO>>> GetAllAsync();
        Task<Result<Size>> GetByIdAsync(int id);
        Task<Result<Size>> AddAsync(SizeDTO sizeDTO);
        Task<Result<Size>> UpdateAsync(int id, SizeDTO sizeDTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
