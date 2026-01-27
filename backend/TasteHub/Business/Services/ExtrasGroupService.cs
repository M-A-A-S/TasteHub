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

        public async Task<Result<ExtrasGroup>> AddAsync(ExtraGroupDTO extrasGroupDTO)
        {
            var extrasGroup = extrasGroupDTO.ToEntity();
            return await _repo.AddAsync(extrasGroup);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<ExtraGroupResponseDTO>>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<Result<ExtrasGroup>> GetByIdAsync(int id)
        {
            return await _repo.FindByAsync(eg => eg.Id, id);
        }

        public async Task<Result<ExtrasGroup>> UpdateAsync(int id, ExtraGroupDTO extrasGroupDTO)
        {
            var existingResult = await GetByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<ExtrasGroup>.Failure(ResultCodes.CategoryNotFound);
            }
            existingResult.Data.UpdateFromDTO(extrasGroupDTO);
            return await _repo.UpdateAsync(existingResult.Data);
        }
    }
}
