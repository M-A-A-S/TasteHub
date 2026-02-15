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
        private readonly ISizeService _sizeService;

        public MenuItemSizeService(IMenuItemSizeRepository repo, ISizeService sizeService)
        {
            _repo = repo;
            _sizeService = sizeService;
        }

        public async Task<Result<MenuItemSizeDTO>> AddAsync(MenuItemSizeDTO menuItemSizeDTO)
        {
            var menuItemSize = menuItemSizeDTO.ToEntity();
            var addResult = await _repo.AddAndSaveAsync(menuItemSize);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<MenuItemSizeDTO>.Failure();
            }

            var sizeResult = await _sizeService.GetByIdAsync(addResult.Data.SizeId);
            var result = addResult.Data.ToDTO();
            result.Size = sizeResult?.Data?.ToDTO();

            return Result<MenuItemSizeDTO>.Success(result);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAndSaveAsync(id);
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


        public async Task<Result<IEnumerable<MenuItemSizeDTO>>> GetByIdsAsync(List<int> ids)
        {
            if (ids == null || !ids.Any())
            {
                return Result<IEnumerable<MenuItemSizeDTO>>.Failure();
            }

            var getAllResult = await _repo.GetAllAsync(x => ids.Contains(x.Id));

            if (!getAllResult.IsSuccess || getAllResult.Data == null || !getAllResult.Data.Any())
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
            var findResult = await _repo.FindByAsync(ms => ms.Id, id, ms => ms.Size);
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

            var updateResult = await _repo.UpdateAndSaveAsync(existingResult.Data);
            if (!updateResult.IsSuccess ||  updateResult.Data == null)
            {
                return Result<MenuItemSizeDTO>.Failure();
            }

            var sizeResult = await _sizeService.GetByIdAsync(updateResult.Data.SizeId);
            var result = updateResult.Data.ToDTO();
            result.Size = sizeResult?.Data?.ToDTO();

            return Result<MenuItemSizeDTO>.Success(result);
        }

        private async Task<Result<MenuItemSize>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(ms => ms.Id, id);
        }
    }
}
