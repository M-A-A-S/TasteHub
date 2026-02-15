using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.MenuItemExtra;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class MenuItemExtraService : IMenuItemExtraService
    {

        private readonly IMenuItemExtraRepository _repo;
        private readonly IExtrasGroupService _extrasGroupService;

        public MenuItemExtraService(IMenuItemExtraRepository repo, IExtrasGroupService extrasGroupService)
        {
            _repo = repo;
            _extrasGroupService = extrasGroupService;
        }

        public async Task<Result<MenuItemExtraDTO>> AddAsync(MenuItemExtraDTO DTO)
        {
            var entity = DTO.ToEntity();
            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<MenuItemExtraDTO>.Failure();
            }
            var extraGroupResult = await _extrasGroupService.GetByIdAsync(addResult.Data.ExtrasGroupId);

            var result = addResult.Data.ToDTO();
            result.ExtrasGroup = extraGroupResult.Data;

            return Result<MenuItemExtraDTO>.Success(result);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAndSaveAsync(id);
        }

        public async Task<Result<IEnumerable<MenuItemExtraDTO>>> GetAllAsync()
        {
            var findAllResult = await _repo.GetAllAsync();
            if (!findAllResult.IsSuccess || findAllResult.Data == null)
            {
                return Result<IEnumerable<MenuItemExtraDTO>>.Failure();
            }
            var result = new List<MenuItemExtraDTO>();
            foreach (var item in findAllResult.Data)
            {
                result.Add(item.ToDTO());
            }
            return Result<IEnumerable<MenuItemExtraDTO>>.Success(result);
        }

        public async Task<Result<MenuItemExtraDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(x => x.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<MenuItemExtraDTO>.Failure();
            }
            return Result<MenuItemExtraDTO>.Success(findResult.Data.ToDTO());
        }

        public async Task<Result<MenuItemExtraDTO>> UpdateAsync(int id, MenuItemExtraDTO DTO)
        {
            var findResult = await FindByIdAsync(id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<MenuItemExtraDTO>.Failure(ResultCodes.NotFound);
            }
            findResult.Data.UpdateFromDTO(DTO);

            var updateResult = await _repo.UpdateAndSaveAsync(findResult.Data);
            if (!updateResult.IsSuccess || updateResult.Data == null)
            {
                return Result<MenuItemExtraDTO>.Failure();
            }
            return Result<MenuItemExtraDTO>.Success(updateResult.Data.ToDTO());
        }

        private async Task<Result<MenuItemExtra>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(ms => ms.Id, id);
        }
    }
}
