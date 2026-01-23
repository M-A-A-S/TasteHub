using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AppDbContext _context;
        protected readonly DbSet<T> _dbSet;
        protected readonly ILogger<T> _logger;

        protected Repository(AppDbContext context, ILogger<T> logger)
        {
            _context = context;
            _dbSet = _context.Set<T>();
            _logger = logger;
        }

        public virtual async Task<Result<T>> AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await _context.SaveChangesAsync();
                return Result<T>.Success(entity);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database update failed while adding entity.");
                return Result<T>.Failure(ResultCodes.DbError, 500, "Database error");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while adding entity.");
                return Result<T>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public virtual async Task<Result<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _dbSet.FindAsync(id);
                if (entity == null)
                {
                    return Result<bool>.Failure(ResultCodes.NotFound, 400, "Entity not found");
                }
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
                return Result<bool>.Success(true);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database update failed while deleting entity.");
                return Result<bool>.Failure(ResultCodes.DbError, 500, "Database error");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while deleting entity.");
                return Result<bool>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public virtual async Task<Result<bool>> DeleteAsync(T entity)
        {
            try
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
                return Result<bool>.Success(true);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database update failed while deleting entity.");
                return Result<bool>.Failure(ResultCodes.DbError, 500, "Database error");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while deleting entity.");
                return Result<bool>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public virtual async Task<Result<IEnumerable<T>>> GetAllAsync(params Expression<Func<T, object>>[] includes)
        {
            try
            {
                IQueryable<T> query = _dbSet.AsNoTracking().AsSplitQuery();

                foreach (var include in includes)
                {
                    query = query.Include(include);
                }

                var data = await query.ToListAsync();

                return Result<IEnumerable<T>>.Success(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<IEnumerable<T>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public virtual async Task<Result<T>> GetByIdAsync(int id, params Expression<Func<T, object>>[] includes)
        {
            try
            {
                IQueryable<T> query = _dbSet.AsNoTracking().AsSplitQuery();

                foreach (var include in includes)
                {
                    query = query.Include(include);
                }

                var entity = await query
                         .FirstOrDefaultAsync(x => EF.Property<int>(x, "Id") == id);

                if (entity == null)
                {
                    return Result<T>.Failure(ResultCodes.NotFound);
                }
                return Result<T>.Success(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving entity by id.");
                return Result<T>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public virtual async Task<Result<PagedResult<T>>> GetPagedAsync(
Expression<Func<T, bool>>? filter = null,
Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
int pageNumber = 1,
int pageSize = 10,
params Expression<Func<T, object>>[] includes)
        {
            try
            {
                pageNumber = pageNumber < 1 ? 1 : pageNumber;
                pageSize = pageSize < 1 ? 10 : pageSize;
                pageSize = pageSize > 100 ? 100 : pageSize;


                IQueryable<T> query = _dbSet.AsNoTracking().AsSplitQuery();

                // Includes (navigation properties
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }


                // Filtering (searching)
                if (filter != null)
                {
                    query = query.Where(filter);
                }

                var total = await query.CountAsync();

                // Sorting
                if (orderBy != null)
                {
                    query = orderBy(query);
                }

                // Pagination
                var skip = (pageNumber - 1) * pageSize;

                var items = await query.Skip(skip).Take(pageSize).ToListAsync();

                var result = new PagedResult<T>
                {
                    Items = items,
                    Total = total,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                };

                return Result<PagedResult<T>>.Success(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving paged data.");
                return Result<PagedResult<T>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

        public virtual async Task<Result<T>> UpdateAsync(T entity)
        {
            try
            {
                _dbSet.Update(entity);
                await _context.SaveChangesAsync();
                return Result<T>.Success(entity);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database update failed while updating entity.");
                return Result<T>.Failure(ResultCodes.DbError, 500, "Database error");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while updating entity.");
                return Result<T>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }


    }
}
