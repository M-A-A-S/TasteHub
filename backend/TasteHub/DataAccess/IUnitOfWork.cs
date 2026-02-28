using TasteHub.DataAccess.Interfaces;
using TasteHub.Utilities;

namespace TasteHub.DataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        IOrderRepository Orders { get; }
        IIngredientBatchRepository IngredientBatches { get; }
        IInventoryTransactionRepository InventoryTransactions { get; }
        IMenuItemRepository MenuItems { get; }
        IMenuItemSizeRepository MenuItemSizes {  get; }
        IMenuItemExtraRepository MenuItemExtras { get; }
        IExtraRepository Extras { get; }
        public IEmployeeRepository Employees { get; }
        public IUserRepository Users { get; }
        public IUserRoleRepository UserRoles { get; }
        public IPersonRepository People { get; }
        public IAttendanceRepository Attendances { get; }
        public IWorkScheduleRepository WorkSchedules { get; }
        public ILeaveRepository Leaves { get; }
        public ILeaveTypeRepository LeaveTypes { get; }
        public ILeaveBalanceRepository LeaveBalances { get; }
        public IPayrollRepository Payrolls { get; }

        public IRefreshTokenRepository RefreshTokens { get; }

        //Task<int> SaveChangesAsync();
        Task<Result<int>> SaveChangesAsync();

    }
}
