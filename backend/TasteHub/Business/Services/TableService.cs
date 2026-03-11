using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Table;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class TableService : ITableService
    {
        private readonly ITableRepository _repo;

        public TableService(ITableRepository repo)
        {
            _repo = repo;
        }

        #region Add
        public async Task<Result<TableDTO>> AddAsync(TableDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _repo.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<TableDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<TableDTO>.Failure();
            }

            return Result<TableDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<TableDTO>>> GetAllAsync()
        {
            var tables = await _repo.GetAllAsync();

            if (!tables.IsSuccess || tables.Data == null)
            {
                return Result<IEnumerable<TableDTO>>.Failure();
            }

            var result = new List<TableDTO>();

            foreach (var item in tables.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<TableDTO>>.Success(result);
        }

        public async Task<Result<TableDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id == id);

            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<TableDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<TableDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<TableDTO>> UpdateAsync(int id, TableDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<TableDTO>.Failure(
                    ResultCodes.TableNotFound,
                    existingResult.StatusCode,
                    "Table not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _repo.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<TableDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<TableDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<TableDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAndSaveAsync(id);
        }
        #endregion

        #region Private Helpers
        private async Task<Result<Table>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id == id);
        }
        #endregion
    }
}
