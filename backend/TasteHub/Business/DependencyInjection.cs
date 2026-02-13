using TasteHub.Business.Interfaces;
using TasteHub.Business.Services;

namespace TasteHub.Business
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IMenuCategoryService, MenuCategoryService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IMenuItemService, MenuItemService>();
            services.AddScoped<IExtrasGroupService, ExtrasGroupService>();
            services.AddScoped<IExtraService, ExtraService>();
            services.AddScoped<ISizeService, SizeService>();
            services.AddScoped<IMenuItemSizeService, MenuItemSizeService>();
            services.AddScoped<IMenuItemExtraService, MenuItemExtraService>();
            services.AddScoped<IOrderService, OrderService>();
            return services;
        }
    }
}
