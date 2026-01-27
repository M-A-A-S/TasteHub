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

        public async Task<Result<MenuCategory>> AddAsync(MenuCategoryDTO categoryDTO)
        {
            var category = categoryDTO.ToEntity();
            return await _repo.AddAsync(category);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<MenuCategory>>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<Result<MenuCategory>> GetByIdAsync(int id)
        {
            return await _repo.FindByAsync(eg => eg.Id, id);
        }

        public async Task<Result<MenuCategory>> UpdateAsync(int id, MenuCategoryDTO categoryDTO)
        {
            var existingResult = await GetByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<MenuCategory>.Failure(ResultCodes.ExtraGroupNotFound);
            }
            existingResult.Data.UpdateFromDTO(categoryDTO);
            return await _repo.UpdateAsync(existingResult.Data);
        }
    }
}
