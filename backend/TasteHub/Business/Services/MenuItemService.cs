using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.JSInterop.Infrastructure;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItem;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly IMenuItemRepository _repo;
        private readonly IImageService _imageService;
        private readonly IOptions<ImageSettings> _imageSettings;
        private readonly IMenuCategoryService _menuCategoryService;

        public MenuItemService(IMenuItemRepository repo, IImageService imageService,
            IOptions<ImageSettings> imageSettings, IMenuCategoryService menuCategoryService)
        {
            _repo = repo;
            _imageService = imageService;
            _imageSettings = imageSettings;
            _menuCategoryService = menuCategoryService;
        }

        public async Task<Result<MenuItemDTO>> AddAsync(MenuItemDTO dto)
        {
            var entity = dto.ToEntity();

            string? imageUrl = null;

            // Save Image
            if (dto.ImageFile != null)
            {
                var imageSaveResult = await _imageService.SaveImageAsync(
                    dto.ImageFile,
                    _imageSettings.Value.MenuItemFolder);

                if (!imageSaveResult.IsSuccess)
                {
                    return Result<MenuItemDTO>.Failure(
                        imageSaveResult.Code, 
                        imageSaveResult.StatusCode);

                }

                imageUrl = imageSaveResult.Data;
            }
            else if (!string.IsNullOrWhiteSpace(dto.ImageUrl) && dto.ImageUrl.IsValidImageUrl())
            {
                imageUrl = dto.ImageUrl;
            }
            else
            {
                imageUrl = null;
            }

            entity.ImageUrl = imageUrl;

            var addResult = await _repo.AddAsync(entity);

            if (!addResult.IsSuccess && imageUrl != null && dto.ImageFile != null)
            {
                await _imageService.DeleteImage(imageUrl);
            }


            if (addResult.IsSuccess && addResult.Data != null)
            {
                addResult.Data.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(addResult.Data.ImageUrl);
            }
            var catagoryResult = await _menuCategoryService.GetByIdAsync(addResult.Data.MenuCategoryId);
            var result = addResult.Data.ToDTO();
            result.MenuCategory = catagoryResult.Data;

            return Result<MenuItemDTO>.Success(result);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            var findResult = await GetByIdAsync(id);
            if (!findResult.IsSuccess)
            {
                return Result<bool>.Failure(
                    findResult.Code, 
                    findResult.StatusCode);
            }

            if (!string.IsNullOrWhiteSpace(findResult.Data.ImageUrl))
            {
                var deleteImageResult = await _imageService.DeleteImage(
    findResult.Data.ImageUrl);

                if (!deleteImageResult.IsSuccess)
                {
                    return Result<bool>.Failure(
                        deleteImageResult.Code,
                        deleteImageResult.StatusCode);
                }
            }

            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<MenuItemDTO>> GetByIdAsync(int id)
        {
            var result = await _repo.FindByAsync(m => m.Id, id);

            if (result.IsSuccess && result.Data != null)
            {
                result.Data.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Data.ImageUrl);
            }
            return Result<MenuItemDTO>.Success(result.Data.ToDTO());
        }
        

        public async Task<Result<PagedResult<MenuItemDTO>>> GetFilteredAsync(
            MenuItemFiltersDTO filters)
        {
            var result = await _repo.GetFilteredAsync(filters);
            
            if (result.IsSuccess && result.Data != null)
            {
                foreach (var item in result.Data.Items)
                {
                    if (item.ImageUrl != null)
                    {
                        item.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(item.ImageUrl);
                    }
                }
            }

            return result;
        }

        public async Task<Result<IEnumerable<MenuItem>>> GetByIdsAsync(List<int> ids)
        {
            if (ids == null || !ids.Any())
            {
                return Result<IEnumerable<MenuItem>>.Failure();
            }

            var getAllResult = await _repo.GetAllAsync(x => ids.Contains(x.Id));

            if (!getAllResult.IsSuccess || getAllResult.Data == null || !getAllResult.Data.Any())
            {
                return Result<IEnumerable<MenuItem>>.Failure();
            }
 
            return Result<IEnumerable<MenuItem>>.Success(getAllResult.Data);
        }

        public async Task<Result<MenuItemDTO>> UpdateAsync(int id, MenuItemDTO dto)
        {
            var existingResult = await _repo.FindByAsync(m => m.Id, id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<MenuItemDTO>.Failure(
                    ResultCodes.MenuItemNotFound, 
                    existingResult.StatusCode, 
                    "Menu item not found");
            }

            var entity = existingResult.Data;
            string? finalImageUrl = entity.ImageUrl;

            // Delete Image Only
            if (dto.DeleteImage && !string.IsNullOrWhiteSpace(entity.ImageUrl))
            {
                var deleteResult = await _imageService.DeleteImage(entity.ImageUrl);
                if (!deleteResult.IsSuccess)
                {
                    return Result<MenuItemDTO>.Failure(
                        deleteResult.Code, 
                        deleteResult.StatusCode);
                }

                finalImageUrl = null;
            }

            // Replace image
            if (dto.ImageFile != null)
            {
                var replaceResult = await _imageService.ReplaceImageAsync(
                    entity.ImageUrl,
                    dto.ImageFile,
                    _imageSettings.Value.MenuItemFolder);

                if (!replaceResult.IsSuccess)
                {
                    return Result<MenuItemDTO>.Failure(
                        replaceResult.Code,
                        replaceResult.StatusCode);
                }

                finalImageUrl = replaceResult.Data;
            }
            else if (!string.IsNullOrWhiteSpace(dto.ImageUrl) && dto.ImageUrl.IsValidImageUrl())
            {
                finalImageUrl = dto.ImageUrl;
            }
            else
            {
                finalImageUrl = null;
            }


            entity.UpdateFromDTO(dto);
            entity.ImageUrl = finalImageUrl;

            var  updateResult = await _repo.UpdateAsync(existingResult.Data);
            if (updateResult.IsSuccess && updateResult.Data != null)
            {
                updateResult.Data.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(updateResult.Data.ImageUrl);
            }

            var categoryResult = await _menuCategoryService.GetByIdAsync(updateResult.Data.MenuCategoryId);
            var result = updateResult.Data.ToDTO();
            result.MenuCategory = categoryResult.Data;


            return Result<MenuItemDTO>.Success(result); 

        }
    
    }
}
