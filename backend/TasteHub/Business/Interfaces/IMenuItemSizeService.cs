using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IMenuItemSizeService
    {

        Task<Result<IEnumerable<MenuItemSizeDTO>>> GetAllAsync();
        Task<Result<MenuItemSizeDTO>> GetByIdAsync(int id);
        Task<Result<MenuItemSizeDTO>> AddAsync(MenuItemSizeDTO menuItemSizeDTO);
        Task<Result<MenuItemSizeDTO>> UpdateAsync(int id, MenuItemSizeDTO menuItemSizeDTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
