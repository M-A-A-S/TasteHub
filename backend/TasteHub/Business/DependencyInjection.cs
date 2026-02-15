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
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IIngredientService, IngredientService>();
            services.AddScoped<IIngredientBatchService, IngredientBatchService>();
            services.AddScoped<IInventoryTransactionService, InventoryTransactionService>();
            services.AddScoped<IMenuItemIngredientService, MenuItemIngredientService>();
            services.AddScoped<IInventoryService, InventoryService>();
            return services;
        }
    }
}
