
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TasteHub.DataAccess
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set ALL foreign keys to Restrict(no cascade delete)
            SetDeleteBehaviorToRestrict(modelBuilder);
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                var entity = entry.Entity;
                var entityType = entity.GetType();

                var createdAtProp = entityType.GetProperty("CreatedAt");
                var updatedAtProp = entityType.GetProperty("UpdatedAt");

                if (entry.State == EntityState.Added)
                {
                    createdAtProp?.SetValue(entity, DateTime.UtcNow);
                }

                updatedAtProp?.SetValue(entity, DateTime.UtcNow);
            }
        }

        private void SetDeleteBehaviorToRestrict(ModelBuilder modelBuilder)
        {
            var foreignKeys = modelBuilder.Model
          .GetEntityTypes()
          .SelectMany(t => t.GetForeignKeys())
          .Where(fk => fk.DeleteBehavior != DeleteBehavior.ClientSetNull); // Skip owned types

            foreach (var fk in foreignKeys)
            {
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            }

        }
    }
}
