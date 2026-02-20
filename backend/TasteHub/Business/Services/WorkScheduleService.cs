using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.WorkSchedule;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class WorkScheduleService : IWorkScheduleService
    {
        private readonly IWorkScheduleRepository _repo;

        public WorkScheduleService(IWorkScheduleRepository repo)
        {
            _repo = repo;
        }

        #region Add
        public async Task<Result<WorkScheduleDTO>> AddAsync(WorkScheduleDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<WorkScheduleDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<WorkScheduleDTO>.Failure();
            }

            return Result<WorkScheduleDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<WorkScheduleDTO>>> GetAllAsync()
        {
            var suppliers = await _repo.GetAllAsync();

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<WorkScheduleDTO>>.Failure();
            }

            var result = new List<WorkScheduleDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<WorkScheduleDTO>>.Success(result);
        }

        public async Task<Result<WorkScheduleDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id == id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<WorkScheduleDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<WorkScheduleDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<WorkScheduleDTO>> UpdateAsync(int id, WorkScheduleDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<WorkScheduleDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _repo.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<WorkScheduleDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<WorkScheduleDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<WorkScheduleDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAndSaveAsync(id);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<WorkSchedule>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
        #endregion
    }
}
