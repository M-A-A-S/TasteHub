using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.DTOs.MenuItemIngredient;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;

namespace TasteHub.Business.Services
{
    public class MenuItemIngredientService : IMenuItemIngredientService
    {

        private readonly IMenuItemIngredientRepository _repo;

        public MenuItemIngredientService(IMenuItemIngredientRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<MenuItemIngredientDTO>> AddAsync(MenuItemIngredientDTO DTO)
        {
            var addResult = await _repo.AddAsync(DTO.ToEntity());
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<MenuItemIngredientDTO>.Failure();
            }

            var findResult = await GetByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<MenuItemIngredientDTO>.Failure();
            }

            return Result<MenuItemIngredientDTO>.Success(findResult.Data);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<MenuItemIngredientDTO>>> GetAllAsync()
        {
            var menuItemIngredients = await _repo.GetAllAsync();

            if (!menuItemIngredients.IsSuccess || menuItemIngredients.Data == null)
            {
                return Result<IEnumerable<MenuItemIngredientDTO>>.Failure();
            }
            var result = menuItemIngredients.Data.Select(item => item.ToDTO());
            return Result<IEnumerable<MenuItemIngredientDTO>>.Success(result);
        }

        public async Task<Result<MenuItemIngredientDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<MenuItemIngredientDTO>.Failure();
            }
            return Result<MenuItemIngredientDTO>.Success(findResult.Data.ToDTO());
        }

        public async Task<Result<MenuItemIngredientDTO>> UpdateAsync(int id, MenuItemIngredientDTO DTO)
        {
            var findResult = await FindByIdAsync(id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<MenuItemIngredientDTO>.Failure();
            }

            findResult.Data.UpdateFromDTO(DTO);

            var updateResult = await _repo.UpdateAsync(findResult.Data);
            if (!updateResult.IsSuccess || updateResult.Data == null)
            {
                return Result<MenuItemIngredientDTO>.Failure();
            }

            return await GetByIdAsync(id);
        }

        private async Task<Result<MenuItemIngredient>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }

    }
}
