using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.JobTitle;
using TasteHub.DTOs.ShiftType;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class ShiftTypeService : IShiftTypeService 
    {

        private readonly IShiftTypeRepository _repo;

        public ShiftTypeService(IShiftTypeRepository repo)
        {
            _repo = repo;
        }

        #region Add
        public async Task<Result<ShiftTypeDTO>> AddAsync(ShiftTypeDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<ShiftTypeDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<ShiftTypeDTO>.Failure();
            }

            return Result<ShiftTypeDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<ShiftTypeDTO>>> GetAllAsync()
        {
            var suppliers = await _repo.GetAllAsync();

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<ShiftTypeDTO>>.Failure();
            }

            var result = new List<ShiftTypeDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<ShiftTypeDTO>>.Success(result);
        }

        public async Task<Result<ShiftTypeDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id == id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<ShiftTypeDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<ShiftTypeDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<ShiftTypeDTO>> UpdateAsync(int id, ShiftTypeDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<ShiftTypeDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _repo.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<ShiftTypeDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<ShiftTypeDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<ShiftTypeDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAndSaveAsync(id);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<ShiftType>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
        #endregion

    }
}
