using TasteHub.DataAccess.Interfaces;
using TasteHub.DataAccess.Repositories;

namespace TasteHub.DataAccess
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationRepositories(this IServiceCollection services)
        {
            services.AddScoped<IMenuCategoryRepository, MenuCategoryRepository>();
            services.AddScoped<IMenuItemRepository, MenuItemRepository>();
            services.AddScoped<IExtrasGroupRepository, ExtrasGroupRepository>();
            services.AddScoped<IExtraRepository, ExtraRepository>();
            return services;
        }
    }
}
