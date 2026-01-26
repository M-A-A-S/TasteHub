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

        public ExtraService(IExtraRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<Extra>> AddAsync(ExtraDTO extraDTO)
        {
            var extra = extraDTO.ToEntity();
            return await _repo.AddAsync(extra);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<ExtraResponseDTO>>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<Result<Extra>> GetByIdAsync(int id)
        {
            return await _repo.GetByIdAsync(id);
        }

        public async Task<Result<Extra>> UpdateAsync(int id, ExtraDTO extraDTO)
        {
            var existingResult = await GetByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<Extra>.Failure(ResultCodes.ExtraNotFound);
            }
            existingResult.Data.UpdateFromDTO(extraDTO);
            return await _repo.UpdateAsync(existingResult.Data);
        }
    }
}
