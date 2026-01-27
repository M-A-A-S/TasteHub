using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class MenuCategoryService : IMenuCategoryService
    {

        private readonly IMenuCategoryRepository _repo;

        public MenuCategoryService(IMenuCategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<MenuCategoryDTO>> AddAsync(MenuCategoryDTO categoryDTO)
        {
            var category = categoryDTO.ToEntity();
            var result = await _repo.AddAsync(category);
            return Result<MenuCategoryDTO>.Success(result.Data.ToDTO());
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<MenuCategory>>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<Result<MenuCategoryDTO>> GetByIdAsync(int id)
        {
            var result = await _repo.FindByAsync(eg => eg.Id, id);
            if (!result.IsSuccess)
                return Result<MenuCategoryDTO>.Failure(result.Message,result.StatusCode);
            return Result<MenuCategoryDTO>.Success(result.Data.ToDTO());
        }
        private async Task<Result<MenuCategory>> _getEntityByIdAsync(int id)
        {
            return await _repo.FindByAsync(eg => eg.Id, id);
        }

        public async Task<Result<MenuCategoryDTO>> UpdateAsync(int id, MenuCategoryDTO categoryDTO)
        {
            var existingResult = await _getEntityByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<MenuCategoryDTO>.Failure(ResultCodes.ExtraGroupNotFound);
            }
            existingResult.Data.UpdateFromDTO(categoryDTO);
            var updatingResult = await _repo.UpdateAsync(existingResult.Data);
            if (!updatingResult.IsSuccess)
                return Result<MenuCategoryDTO>.Failure(updatingResult.Message,updatingResult.StatusCode);
            return Result<MenuCategoryDTO>.Success(updatingResult.Data.ToDTO());
        }
    }
}
