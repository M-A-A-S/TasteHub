using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class MenuItemSizeService : IMenuItemSizeService
    {

        private readonly IMenuItemSizeRepository _repo;

        public MenuItemSizeService(IMenuItemSizeRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<MenuItemSizeDTO>> AddAsync(MenuItemSizeDTO menuItemSizeDTO)
        {
            var menuItemSize = menuItemSizeDTO.ToEntity();
            var addResult = await _repo.AddAsync(menuItemSize);
            if (!addResult.IsSuccess)
            {
                return Result<MenuItemSizeDTO>.Failure();
            }
            return Result<MenuItemSizeDTO>.Success(menuItemSizeDTO);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<MenuItemSizeDTO>>> GetAllAsync()
        {
            var getAllResult = await _repo.GetAllAsync();
            if (!getAllResult.IsSuccess || getAllResult.Data == null)
            {
                return Result<IEnumerable<MenuItemSizeDTO>>.Failure();
            }
            var result = new List<MenuItemSizeDTO>();
            foreach (var item in getAllResult.Data)
            {
                result.Add(item.ToDTO());
            }
            return Result<IEnumerable<MenuItemSizeDTO>>.Success(result);
        }

        public async Task<Result<MenuItemSizeDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(ms => ms.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<MenuItemSizeDTO>.Failure();
            }
            return Result<MenuItemSizeDTO>.Success(findResult.Data.ToDTO());
        }

        public async Task<Result<MenuItemSizeDTO>> UpdateAsync(int id, MenuItemSizeDTO menuItemSizeDTO)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<MenuItemSizeDTO>.Failure(ResultCodes.ExtraNotFound);
            }
            existingResult.Data.UpdateFromDTO(menuItemSizeDTO);

            var updateResult = await _repo.UpdateAsync(existingResult.Data);
            if (!updateResult.IsSuccess ||  updateResult.Data == null)
            {
                return Result<MenuItemSizeDTO>.Failure();
            }
            return Result<MenuItemSizeDTO>.Success(updateResult.Data.ToDTO());
        }

        private async Task<Result<MenuItemSize>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(ms => ms.Id, id);
        }
    }
}
