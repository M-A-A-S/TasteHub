using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class ExtraService : IExtraService
    {

        private readonly IExtraRepository _repo;
        private readonly IExtrasGroupService _extrasGroupService;
        public ExtraService(IExtraRepository repo, IExtrasGroupService extrasGroupService)
        {
            _repo = repo;
            _extrasGroupService = extrasGroupService;
        }

        public async Task<Result<ExtraDTO>> AddAsync(ExtraDTO extraDTO)
        {
            var extra = extraDTO.ToEntity();
            var addResult =  await _repo.AddAsync(extra);
            if (!addResult.IsSuccess)
            {
                return Result<ExtraDTO>.Failure(addResult.Code, addResult.StatusCode, addResult.Message);
            }
             var extrasGroupResult = await _extrasGroupService.GetByIdAsync(addResult.Data.GroupId);
            var result = addResult.Data.ToDTO();
            result.Group = extrasGroupResult.Data;

            return Result<ExtraDTO>.Success(result);

        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<ExtraDTO>>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<Result<ExtraDTO>> GetByIdAsync(int id)
        {
            var result = await _repo.FindByAsync(e => e.Id, id);
            if (!result.IsSuccess)
            {
                return Result<ExtraDTO>.Failure(result.Code, result.StatusCode, result.Message);
            }

            return Result<ExtraDTO>.Success(result.Data.ToDTO());
        }
        private async Task<Result<Extra>> _getEntityByIdAsync(int id)
        {
            return await _repo.FindByAsync(eg => eg.Id, id);
        }
        public async Task<Result<ExtraDTO>> UpdateAsync(int id, ExtraDTO extraDTO)
        {
            var existingResult = await _getEntityByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<ExtraDTO>.Failure(ResultCodes.ExtraNotFound);
            }

            existingResult.Data.UpdateFromDTO(extraDTO);
            
            var updateResult =  await _repo.UpdateAsync(existingResult.Data);
            if (!updateResult.IsSuccess)
            {
                return Result<ExtraDTO>.Failure(updateResult.Code, updateResult.StatusCode, updateResult.Message);
            }
            var groupResult = await _extrasGroupService.GetByIdAsync(updateResult.Data.GroupId);
            var result = updateResult.Data.ToDTO();
            result.Group = groupResult.Data;
            return Result<ExtraDTO>.Success(result);
        }
    }
}
