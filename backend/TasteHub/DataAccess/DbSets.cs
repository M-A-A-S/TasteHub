using Microsoft.EntityFrameworkCore;
using TasteHub.Entities;

namespace TasteHub.DataAccess
{
    public partial class AppDbContext
    {
        // Core Identity
        public DbSet<Person> People { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<UserRole> UserRoles { get; set; } = null!;

        // Customers & Suppliers
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Supplier> Suppliers { get; set; } = null!;

        // Menu
        public DbSet<MenuCategory> MenuCategories { get; set; } = null!;
        public DbSet<MenuItem> MenuItems { get; set; } = null!;
        public DbSet<Size> Sizes { get; set; } = null!;
        public DbSet<MenuItemSize> MenuItemSizes { get; set; } = null!;
        public DbSet<ExtrasGroup> ExtrasGroups { get; set; } = null!;
        public DbSet<Extra> Extras { get; set; } = null!;
        public DbSet<MenuItemExtra> MenuItemExtras { get; set; } = null!;
        public DbSet<MenuItemIngredient> MenuItemIngredients { get; set; } = null!;
        public DbSet<Ingredient> Ingredients { get; set; } = null!;
        public DbSet<IngredientBatch> IngredientBatches { get; set; } = null!;


        // Orders & Payments
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<OrderItemExtra> OrderItemExtras { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;
        public DbSet<PaymentMethod> PaymentMethods { get; set; } = null!;

        // Tables & Reservations
        public DbSet<Table> Tables { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;
        public DbSet<ReservationTable> ReservationTables { get; set; } = null!;


        // HR / Staff
        public DbSet<JobTitle> JobTitles { get; set; } = null!;
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<ShiftType> ShiftTypes { get; set; } = null!;
        public DbSet<WorkSchedule> WorkSchedules { get; set; } = null!;
        public DbSet<Attendance> Attendances { get; set; } = null!;
        public DbSet<Leave> Leaves { get; set; } = null!;
        public DbSet<LeaveType> LeaveTypes { get; set; } = null!;
        public DbSet<Payroll> Payrolls { get; set; } = null!;

        // Lookup tables (Statuses, Types, etc.) 

    }
}
