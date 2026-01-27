using TasteHub.DTOs.MenuItemExtra;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IMenuItemExtraService
    {

        Task<Result<IEnumerable<MenuItemExtraDTO>>> GetAllAsync();
        Task<Result<MenuItemExtraDTO>> GetByIdAsync(int id);
        Task<Result<MenuItemExtraDTO>> AddAsync(MenuItemExtraDTO DTO);
        Task<Result<MenuItemExtraDTO>> UpdateAsync(int id, MenuItemExtraDTO DTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
