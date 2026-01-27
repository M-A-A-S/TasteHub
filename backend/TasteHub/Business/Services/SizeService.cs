using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.Size;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class SizeService : ISizeService
    {

        private readonly ISizeRepository _repo;

        public SizeService(ISizeRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<Size>> AddAsync(SizeDTO sizeDTO)
        {
            var size = sizeDTO.ToEntity();
            return await _repo.AddAsync(size);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<SizeDTO>>> GetAllAsync()
        {
            var result = new List<SizeDTO>();
            var sizes = await _repo.GetAllAsync();
            foreach (var size in sizes.Data)
            {
                result.Add(size.ToDTO());
            }
            return Result<IEnumerable<SizeDTO>>.Success(result);
        }

        public async Task<Result<Size>> GetByIdAsync(int id)
        {
            return await _repo.FindByAsync(s => s.Id, id);
        }

        public async Task<Result<Size>> UpdateAsync(int id, SizeDTO sizeDTO)
        {
            var existingResult = await GetByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<Size>.Failure(ResultCodes.SizeNotFound);
            }
            existingResult.Data.UpdateFromDTO(sizeDTO);
            return await _repo.UpdateAsync(existingResult.Data);
        }
    }
}
