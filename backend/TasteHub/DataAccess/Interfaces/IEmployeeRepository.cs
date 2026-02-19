using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<Result<IEnumerable<Employee>>> GetAllAsync();
    }
}
