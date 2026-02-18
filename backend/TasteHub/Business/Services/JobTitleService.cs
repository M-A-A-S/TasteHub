using Microsoft.Extensions.Options;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Employee;
using TasteHub.DTOs.JobTitle;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class JobTitleService : IJobTitleService
    {

        private readonly IJobTitleRepository _repo;

        public JobTitleService(IJobTitleRepository repo)
        {
            _repo = repo;
        }

        #region Add
        public async Task<Result<JobTitleDTO>> AddAsync(JobTitleDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<JobTitleDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<JobTitleDTO>.Failure();
            }

            return Result<JobTitleDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<JobTitleDTO>>> GetAllAsync()
        {
            var suppliers = await _repo.GetAllAsync();

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<JobTitleDTO>>.Failure();
            }

            var result = new List<JobTitleDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<JobTitleDTO>>.Success(result);
        }

        public async Task<Result<JobTitleDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<JobTitleDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<JobTitleDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<JobTitleDTO>> UpdateAsync(int id, JobTitleDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<JobTitleDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _repo.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<JobTitleDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<JobTitleDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<JobTitleDTO>.Success(result);

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

            var deleteResult = await _repo.DeleteAndSaveAsync(id);

            if (!deleteResult.IsSuccess)
            {
                return deleteResult;
            }

            return Result<bool>.Success(true);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<JobTitle>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
        #endregion

    }
}
