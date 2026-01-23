using TasteHub.Business.Interfaces;
using TasteHub.Business.Services;

namespace TasteHub.Business
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IMenuCategoryService, MenuCategoryService>();
            return services;
        }
    }
}
