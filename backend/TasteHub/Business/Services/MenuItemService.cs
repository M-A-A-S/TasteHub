using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
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

        public MenuItemService(IMenuItemRepository repo, IImageService imageService,
            IOptions<ImageSettings> imageSettings)
        {
            _repo = repo;
            _imageService = imageService;
            _imageSettings = imageSettings;
        }

        public async Task<Result<MenuItem>> AddAsync(MenuItemDTO dto)
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
                    return Result<MenuItem>.Failure(
                        imageSaveResult.Code, 
                        imageSaveResult.StatusCode);

                }

                imageUrl = imageSaveResult.Data;
                entity.ImageUrl = imageUrl;
            }

            var result = await _repo.AddAsync(entity);

            if (!result.IsSuccess && imageUrl != null)
            {
                await _imageService.DeleteImage(imageUrl);
            }

            if (result.IsSuccess && result.Data != null)
            {
                result.Data.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Data.ImageUrl);
            }

            return result;
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

        public async Task<Result<MenuItem>> GetByIdAsync(int id)
        {
            var result = await _repo.GetByIdAsync(id);

            if (result.IsSuccess && result.Data != null)
            {
                result.Data.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Data.ImageUrl);
            }
            return await _repo.GetByIdAsync(id);
        }

        public async Task<Result<PagedResult<MenuItemResponseDTO>>> GetFilteredAsync(
            int? categoryId = null,
            string? search = null,
            string? sort = null,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var result = await _repo.GetFilteredAsync(categoryId, search, sort, pageNumber, pageSize);
            
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

        public async Task<Result<MenuItem>> UpdateAsync(int id, MenuItemDTO dto)
        {
            var existingResult = await _repo.GetByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<MenuItem>.Failure(
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
                    return Result<MenuItem>.Failure(
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
                    return Result<MenuItem>.Failure(
                        replaceResult.Code,
                        replaceResult.StatusCode);
                }

                finalImageUrl = replaceResult.Data;
            }


            entity.UpdateFromDTO(dto);
            entity.ImageUrl = finalImageUrl;

            var  result = await _repo.UpdateAsync(existingResult.Data);
            if (result.IsSuccess && result.Data != null)
            {
                result.Data.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Data.ImageUrl);
            }
            return result;

        }
    
    }
}
