using System.Linq.Expressions;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<Result<IEnumerable<T>>> GetAllAsync(params Expression<Func<T, object>>[] includes);
        Task<Result<T>> GetByIdAsync(int id, params Expression<Func<T, object>>[] includes);
        Task<Result<PagedResult<T>>> GetPagedAsync(
    Expression<Func<T, bool>>? filter = null,
    Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    params Expression<Func<T, object>>[] includes);

        Task<Result<T>> AddAsync(T entity);
        Task<Result<T>> UpdateAsync(T entity);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<bool>> DeleteAsync(T entity);


    }

}
