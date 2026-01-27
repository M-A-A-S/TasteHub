using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class ExtrasGroupService : IExtrasGroupService
    {

        private readonly IExtrasGroupRepository _repo;

        public ExtrasGroupService(IExtrasGroupRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<ExtraGroupDTO>> AddAsync(ExtraGroupDTO extrasGroupDTO)
        {
            var extrasGroup = extrasGroupDTO.ToEntity();
            var result = await _repo.AddAsync(extrasGroup);
            if (!result.IsSuccess)
            {
                return Result<ExtraGroupDTO>.Failure(result.Code, result.StatusCode, result.Message);
            }
            return Result<ExtraGroupDTO>.Success(result.Data.ToDTO());
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<ExtraGroupDTO>>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<Result<ExtraGroupDTO>> GetByIdAsync(int id)
        {
            var result =  await _repo.FindByAsync(eg => eg.Id, id);
            if (!result.IsSuccess)
            {
                return Result<ExtraGroupDTO>.Failure(result.Code, result.StatusCode,result.Message);
            }
            return Result<ExtraGroupDTO>.Success(result.Data.ToDTO());
        }
        private async Task<Result<ExtrasGroup>> _getEntityById(int id)
        {
            return await _repo.FindByAsync(eg => eg.Id, id);
        }

        public async Task<Result<ExtraGroupDTO>> UpdateAsync(int id, ExtraGroupDTO extrasGroupDTO)
        {
            var existingResult = await _getEntityById(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<ExtraGroupDTO>.Failure(ResultCodes.CategoryNotFound);
            }
            existingResult.Data.UpdateFromDTO(extrasGroupDTO);
            var result = await _repo.UpdateAsync(existingResult.Data);
            if (!result.IsSuccess)
            {
                return Result<ExtraGroupDTO>.Failure(result.Code, result.StatusCode, result.Message);
            }
            return Result<ExtraGroupDTO>.Success(result.Data.ToDTO());
        }
    }
}
