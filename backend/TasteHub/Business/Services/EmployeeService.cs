using Microsoft.Extensions.Options;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Employee;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class EmployeeService : IEmployeeService
    {

        private readonly IEmployeeRepository _repo;
        private readonly IImageService _imageService;
        private readonly IOptions<ImageSettings> _imageSettings;

        public EmployeeService(IEmployeeRepository repo, IImageService imageService,
            IOptions<ImageSettings> imageSettings)
        {
            _repo = repo;
            _imageService = imageService;
            _imageSettings = imageSettings;
        }

        #region Add
        public async Task<Result<EmployeeDTO>> AddAsync(EmployeeDTO dto)
        {
            var entity = dto.ToEntity();
            string? imageUrl = null;

            // Save Image File
            if (dto?.Person?.ImageFile != null)
            {
                var imageSaveResult = await _imageService.SaveImageAsync(
                    dto.Person.ImageFile,
                    _imageSettings.Value.ProfileFolder);

                if (!imageSaveResult.IsSuccess)
                {
                    return Result<EmployeeDTO>.Failure(
                        imageSaveResult.Code,
                        imageSaveResult.StatusCode);

                }

                imageUrl = imageSaveResult.Data;
            }
            // Use external  image URL
            else if (!string.IsNullOrWhiteSpace(dto?.Person?.ImageUrl) &&
                dto.Person.ImageUrl.IsValidImageUrl())
            {
                imageUrl = dto.Person.ImageUrl;
            }

            entity.Person.ImageUrl = imageUrl;

            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                if (!string.IsNullOrEmpty(imageUrl))
                {
                    await _imageService.DeleteImage(imageUrl);
                }
                return Result<EmployeeDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<EmployeeDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);

            return Result<EmployeeDTO>.Success(result);

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<EmployeeDTO>>> GetAllAsync()
        {
            var suppliers = await _repo.GetAllAsync(item => true, item => item.Person);

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<EmployeeDTO>>.Failure();
            }

            var result = new List<EmployeeDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                if (newItem.Person.ImageUrl != null)
                {
                    newItem.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(newItem.Person.ImageUrl);
                }
                result.Add(newItem);
            }

            return Result<IEnumerable<EmployeeDTO>>.Success(result);
        }

        public async Task<Result<EmployeeDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id, i => i.Person);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<EmployeeDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);
            return Result<EmployeeDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<EmployeeDTO>> UpdateAsync(int id, EmployeeDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<EmployeeDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;
            string? oldImageUrl = entity.Person?.ImageUrl;
            string? finalImageUrl = oldImageUrl;

            // Delete Image Only
            if (dto?.Person?.DeleteImage == true && !string.IsNullOrWhiteSpace(oldImageUrl))
            {
                var deleteResult = await _imageService.DeleteImage(oldImageUrl);
                if (!deleteResult.IsSuccess)
                {
                    return Result<EmployeeDTO>.Failure(
                        deleteResult.Code,
                        deleteResult.StatusCode);
                }

                finalImageUrl = null;
            }

            // Replace image
            if (dto?.Person?.ImageFile != null)
            {
                var replaceResult = await _imageService.ReplaceImageAsync(
                    oldImageUrl,
                    dto.Person.ImageFile,
                    _imageSettings.Value.ProfileFolder);

                if (!replaceResult.IsSuccess)
                {
                    return Result<EmployeeDTO>.Failure(
                        replaceResult.Code,
                        replaceResult.StatusCode);
                }

                finalImageUrl = replaceResult.Data;
            }
            // External URL
            else if (!string.IsNullOrWhiteSpace(dto?.Person?.ImageUrl) &&
                dto.Person.ImageUrl.IsValidImageUrl())
            {
                finalImageUrl = dto.Person.ImageUrl;
            }

            entity.UpdateFromDTO(dto);
            entity.Person.ImageUrl = finalImageUrl;

            var updateResult = await _repo.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                if (dto.Person?.ImageFile != null &&
                    !string.IsNullOrWhiteSpace(finalImageUrl))
                {
                    await _imageService.DeleteImage(finalImageUrl);
                }
                return Result<EmployeeDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<EmployeeDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);

            return Result<EmployeeDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            var existing = await FindByIdAsync(id);

            if (!existing.IsSuccess || existing.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.SupplierNotFound);
            }

            var imageUrl = existing.Data.Person?.ImageUrl;

            var deleteResult = await _repo.DeleteAndSaveAsync(id);

            if (!deleteResult.IsSuccess)
            {
                return deleteResult;
            }

            if (!string.IsNullOrWhiteSpace(imageUrl))
            {
                await _imageService.DeleteImage(imageUrl);
            }

            return Result<bool>.Success(true);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<Employee>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id, item => item.Person);
        }
        #endregion
    }
}
