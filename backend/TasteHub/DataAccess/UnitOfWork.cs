using TasteHub.DataAccess.Interfaces;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UnitOfWork> _logger;

        public IOrderRepository Orders { get; }
        public IIngredientBatchRepository IngredientBatches { get; }
        public IInventoryTransactionRepository InventoryTransactions { get; }
        public IMenuItemRepository MenuItems { get; }
        public IMenuItemSizeRepository MenuItemSizes { get; }
        public IMenuItemExtraRepository MenuItemExtras { get; }
        public IExtraRepository Extras { get; }

        public IEmployeeRepository Employees { get; }
        public IUserRepository Users { get; }
        public IUserRoleRepository UserRoles { get; }
        public IPersonRepository People { get; }
        public IAttendanceRepository Attendances { get; }
        public IWorkScheduleRepository WorkSchedules { get; }
        public ILeaveRepository Leaves { get; }
        public ILeaveTypeRepository LeaveTypes { get; }
        public  ILeaveBalanceRepository LeaveBalances { get; }
        public  IPayrollRepository Payrolls { get; }

        public IRefreshTokenRepository RefreshTokens { get; }
        public IConfirmationTokenRepository ConfirmationTokens { get; }

        public UnitOfWork(AppDbContext context, 
            ILogger<UnitOfWork> logger, 
            IOrderRepository orders, 
            IIngredientBatchRepository ingredientBatches, 
            IInventoryTransactionRepository inventoryTransactions,
            IMenuItemRepository menuItems,
            IMenuItemSizeRepository menuItemSizes,
            IMenuItemExtraRepository menuItemExtras,
            IExtraRepository extras,
            IEmployeeRepository employees,
            IUserRepository users,
            IUserRoleRepository userRoles,
            IPersonRepository people,
            IAttendanceRepository attendances,
            IWorkScheduleRepository workSchedules,
            ILeaveRepository leaves,
            ILeaveTypeRepository leaveTypes,
            ILeaveBalanceRepository leaveBalances,
            IPayrollRepository payrolls,
            IRefreshTokenRepository refreshTokens,
            IConfirmationTokenRepository confirmationTokens
            )
        {
            _context = context;
            Orders = orders;
            IngredientBatches = ingredientBatches;
            InventoryTransactions = inventoryTransactions;
            MenuItems = menuItems;
            MenuItemSizes = menuItemSizes;
            MenuItemExtras = menuItemExtras;
            Extras = extras;
            _logger = logger;
            Employees = employees;
            Users = users;
            UserRoles = userRoles;
            People = people;
            Attendances = attendances;
            WorkSchedules = workSchedules;
            Leaves = leaves;
            LeaveTypes = leaveTypes;
            LeaveBalances = leaveBalances;
            Payrolls = payrolls;
            RefreshTokens = refreshTokens;
            ConfirmationTokens = confirmationTokens;
        }

        //public async Task<int> SaveChangesAsync()
        //{
        //    try
        //    {
        //        return await _context.SaveChangesAsync();
        //    } 
        //    catch ( Exception ex )
        //    {
        //        _logger.LogError(ex, "Error saving changes in UnitOfWork");
        //        throw;
        //    }
        //}

        public async Task<Result<int>> SaveChangesAsync()
        {
            try
            {
                var changes = await _context.SaveChangesAsync();
                return Result<int>.Success(changes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving changes in UnitOfWork");
                return Result<int>.Failure(ResultCodes.DbError);
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
