using Microsoft.Extensions.Options;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Role;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repo;

        public RoleService(IRoleRepository repo)
        {
            _repo = repo;
        }


        #region Add
        public async Task<Result<RoleDTO>> AddAsync(RoleDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<RoleDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<RoleDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<RoleDTO>.Success(result);

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<RoleDTO>>> GetAllAsync()
        {
            var suppliers = await _repo.GetAllAsync();

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<RoleDTO>>.Failure();
            }

            var result = new List<RoleDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<RoleDTO>>.Success(result);
        }

        public async Task<Result<RoleDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<RoleDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<RoleDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<RoleDTO>> UpdateAsync(int id, RoleDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<RoleDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _repo.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<RoleDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<RoleDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<RoleDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            var deleteResult = await _repo.DeleteAndSaveAsync(id);

            if (!deleteResult.IsSuccess)
            {
                return deleteResult;
            }

            return Result<bool>.Success(true);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<Role>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
        #endregion
    }
}
