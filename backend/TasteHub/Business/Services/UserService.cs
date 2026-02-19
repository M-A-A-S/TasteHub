using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Role;
using TasteHub.DTOs.Supplier;
using TasteHub.DTOs.User;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IImageService _imageService;
        private readonly IOptions<ImageSettings> _imageSettings;

        public UserService(IUserRepository repo, IImageService imageService,
            IOptions<ImageSettings> imageSettings, IUserRoleRepository userRoleRepository)
        {
            _repo = repo;
            _imageService = imageService;
            _imageSettings = imageSettings;
            _userRoleRepository = userRoleRepository;
        }

        #region Add
        public async Task<Result<UserDTO>> AddAsync(UserDTO dto)
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
                    return Result<UserDTO>.Failure(
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
                return Result<UserDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<UserDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);

            return Result<UserDTO>.Success(result);

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<UserDTO>>> GetAllAsync()
        {
            var suppliers = await _repo.GetAllAsync(item => true, item => item.Person);

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<UserDTO>>.Failure();
            }

            var result = new List<UserDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                if (newItem.Person.ImageUrl != null)
                {
                    newItem.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(newItem.Person.ImageUrl);
                }
                result.Add(newItem);
            }

            return Result<IEnumerable<UserDTO>>.Success(result);
        }

        public async Task<Result<UserDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id, i => i.Person);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<UserDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            if (result.Person.ImageUrl != null)
            {
                result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);
            }
            return Result<UserDTO>.Success(result);
        }

        public async Task<Result<UserDTO>> GetByEmailAsync(string email)
        {
            var findResult = await _repo.FindByAsync(i => i.Email, email, i => i.Person);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<UserDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            if (result.Person.ImageUrl != null)
            {
                result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);
            }    
            return Result<UserDTO>.Success(result);
        }

        public async Task<Result<UserDTO>> GetByUsernameAsync(string username)
        {
            var findResult = await _repo.FindByAsync(i => i.Username, username, i => i.Person);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<UserDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            if (result.Person.ImageUrl != null)
            {
                result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);
            }
            return Result<UserDTO>.Success(result);
        }

        #endregion

        #region Update
        public async Task<Result<UserDTO>> UpdateAsync(int id, UserDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<UserDTO>.Failure(
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
                    return Result<UserDTO>.Failure(
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
                    return Result<UserDTO>.Failure(
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
                return Result<UserDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<UserDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            result.Person.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(result.Person.ImageUrl);

            return Result<UserDTO>.Success(result);

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

        #region Others
        public async Task<Result<bool>> UpdateUserRolesAsync(int userId, IEnumerable<int> newRoleIds)
        {
            var existingResult = await FindByIdAsync(userId);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<bool>.Failure(
                    ResultCodes.UserNotFound,
                    existingResult.StatusCode,
                    "User not found");
            }

            var rolesToRemove = existingResult.Data.Roles
            .Where(r => !newRoleIds.Contains(r.RoleId))
            .ToList();

            // TODO: use unit of work or tractions
            var deleteResult = await _userRoleRepository.DeleteRangeAndSaveAsync(rolesToRemove);

            if (!deleteResult.IsSuccess)
            {
                return Result<bool>.Failure();
            }

            var rolesToAdd = newRoleIds
                .Where(id => !existingResult.Data.Roles.Any(r => r.RoleId == id))
                .Select(id => new UserRole { UserId = existingResult.Data.Id, RoleId = id })
                .ToList();

            var addResult =  await _userRoleRepository.AddRangeAndSaveAsync(rolesToAdd);

            if (!addResult.IsSuccess)
            {
                return Result<bool>.Failure();
            }

            return Result<bool>.Success(true);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<User>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id == id, q => q.Include(x => x.Person).Include(x => x.Roles).ThenInclude(x => x.Role));
        }
        #endregion

    }
}
