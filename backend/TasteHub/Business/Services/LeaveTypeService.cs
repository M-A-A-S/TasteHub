using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.LeaveType;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class LeaveTypeService : ILeaveTypeService
    {
        private readonly ILeaveTypeRepository _repo;

        public LeaveTypeService(ILeaveTypeRepository repo)
        {
            _repo = repo;
        }

        #region Add
        public async Task<Result<LeaveTypeDTO>> AddAsync(LeaveTypeDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<LeaveTypeDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<LeaveTypeDTO>.Failure();
            }

            return Result<LeaveTypeDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<LeaveTypeDTO>>> GetAllAsync()
        {
            var suppliers = await _repo.GetAllAsync();

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<LeaveTypeDTO>>.Failure();
            }

            var result = new List<LeaveTypeDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<LeaveTypeDTO>>.Success(result);
        }

        public async Task<Result<LeaveTypeDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id == id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<LeaveTypeDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<LeaveTypeDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<LeaveTypeDTO>> UpdateAsync(int id, LeaveTypeDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<LeaveTypeDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _repo.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<LeaveTypeDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<LeaveTypeDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<LeaveTypeDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAndSaveAsync(id);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<LeaveType>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
        #endregion  
    }
}
