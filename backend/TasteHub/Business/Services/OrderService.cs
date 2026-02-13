using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.DTOs.Order;
using TasteHub.DTOs.OrderItem;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repo;
        private readonly IMenuItemSizeService _menuItemSizeService;
        private readonly IMenuItemService _menuItemService;
        private readonly IExtraService _extraService;
        public OrderService(
            IOrderRepository repo, 
            IMenuItemSizeService menuItemSizeService, 
            IMenuItemService menuItemService,
            IExtraService extraService
            )
        {
            _repo = repo;
            _menuItemSizeService = menuItemSizeService;
            _menuItemService = menuItemService;
            _extraService = extraService;
        }

        public async Task<Result<PagedResult<OrderDTO>>> GetFilteredAsync(
    OrderFiltersDTO filters)
        {
            var getOrdersResult = await _repo.GetOrdersWithDetailsAsync(filters);

            if (!getOrdersResult.IsSuccess || getOrdersResult.Data == null)
            {
                return Result<PagedResult<OrderDTO>>.Failure();
            }

            var items = getOrdersResult.Data.Items?.Select(o =>
            {
                var dto = o.ToDTO();

                foreach (var item in dto?.OrderItems ?? new List<OrderItemDTO>())
                {
                    if (item.MenuItem?.ImageUrl != null)
                    {
                        item.MenuItem.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(item.MenuItem.ImageUrl);
                    }

                    if (item?.MenuItemSize?.MenuItem?.ImageUrl != null)
                    {
                        item.MenuItemSize.MenuItem.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(item.MenuItemSize.MenuItem.ImageUrl);
                    }
                }
                return dto;

            }).ToList()
                        ?? new List<OrderDTO>();
            
            var pagedResult = new PagedResult<OrderDTO>()
            {
                Items = items,
                PageNumber = getOrdersResult.Data.PageNumber,
                PageSize = getOrdersResult.Data.PageSize,
                Total = getOrdersResult.Data.Total
            };

            return Result<PagedResult<OrderDTO>>.Success(pagedResult);
        }

        public async Task<Result<OrderDTO>> CreateOrderAsync(CreateOrderRequest request)
        {

            if (request.Items == null || !request.Items.Any())
            {
                return Result<OrderDTO>.Failure();
            }


            var menuItemSizeIds = request.Items
                .Where(x => x.MenuItemSizeId > 0)
                .Select(x => x.MenuItemSizeId)
                .Distinct()
                .ToList();

            var menuItemIds = request.Items
                .Where(x => x.MenuItemId > 0)
                .Select(x => x.MenuItemId)
                .Distinct()
                .ToList();

            var extraIds = request.Items
                .Where(x => x.ExtrasIds != null)
                .SelectMany(x => x.ExtrasIds)
                .Distinct()
                .ToList();

            var menuItemSizesResult = await _menuItemSizeService.GetByIdsAsync(menuItemSizeIds);
            var menuItemsResult = await _menuItemService.GetByIdsAsync(menuItemIds);
            var extrasResult = await _extraService.GetByIdsAsync(extraIds);

            if ((!menuItemSizesResult.IsSuccess && menuItemSizeIds.Any()) ||
                (!menuItemsResult.IsSuccess && menuItemIds.Any()) || 
                (!extrasResult.IsSuccess && extraIds.Any()))
            {
                return Result<OrderDTO>.Failure();
            }

            var menuItemSizes = menuItemSizesResult.Data?.ToDictionary(x => x.Id) ?? new Dictionary<int?, MenuItemSizeDTO>();
            var menuItems = menuItemsResult.Data?.ToDictionary(x => x.Id) ?? new Dictionary<int, MenuItem>();
            var extras = extrasResult.Data?.ToDictionary(x => x.Id) ?? new Dictionary<int?, ExtraDTO>();

            var order = new Order
            {
                TableId = request.TableId,
                UserId = 1, // TODO: get it form logged in user
                OrderStatus = OrderStatus.Pending,
                OrderType = OrderType.DineIn, // TODO: get it from frontend
                OrderItems = new List<OrderItem>()
            };

            decimal subtotal = 0;

            foreach (var item in request.Items)
            {
                var createItemResult = CreateOrderItem(item, menuItemSizes, menuItems, extras);

                if (!createItemResult.IsSuccess)
                {
                    return Result<OrderDTO>.Failure();
                }
                subtotal += createItemResult.Data.LineTotal;
                order.OrderItems.Add(createItemResult.Data);
            }

            order.SubtotalAmount = subtotal;
            order.DiscountAmount = 0;
            order.TaxAmount = 0;
            order.GrandTotal = subtotal + order.TaxAmount;

            var createOrderResult = await _repo.AddAsync(order);
            if (!createOrderResult.IsSuccess)
            {
                return Result<OrderDTO>.Failure();
            }

            var fullOrderResult = await _repo.GetOrderWithDetailsAsync(createOrderResult.Data.Id);

            if (!fullOrderResult.IsSuccess || fullOrderResult.Data == null)
            {
                return Result<OrderDTO>.Failure();
            }

            var dto = fullOrderResult.Data.ToDTO();

            foreach (var item in dto?.OrderItems ?? new List<OrderItemDTO>())
            {
                if (item.MenuItem?.ImageUrl != null)
                {
                    item.MenuItem.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(item.MenuItem.ImageUrl);
                }

                if (item?.MenuItemSize?.MenuItem?.ImageUrl != null)
                {
                    item.MenuItemSize.MenuItem.ImageUrl = ImageUrlHelper.ToAbsoluteUrl(item.MenuItemSize.MenuItem.ImageUrl);
                }
            }

            return Result<OrderDTO>.Success(dto);
        }
    
        private Result<OrderItem> CreateOrderItem(
            CreateOrderItemRequest item,
            Dictionary<int?, MenuItemSizeDTO> menuItemSizes,
            Dictionary<int, MenuItem> menuItems,
            Dictionary<int?, ExtraDTO> extras
            )
        {
            decimal unitPrice = 0;

            if (item.MenuItemSizeId > 0 && menuItemSizes.TryGetValue(item.MenuItemSizeId, out var menuItemSize))
            {
                unitPrice = menuItemSize.Price;
            }
            else if (menuItems.TryGetValue(item.MenuItemId, out var menuItem))
            {
                unitPrice = menuItem.Price;
            }
            else
            {
                return Result<OrderItem>.Failure(ResultCodes.MenuItemNotFound);
            }

            var orderItemExtras = new List<OrderItemExtra>();
            decimal extrasTotal = 0;

            if (item.ExtrasIds != null)
            {
                foreach (var extraId in item.ExtrasIds)
                {
                    if (!extras.TryGetValue(extraId, out var extra))
                    {
                        return Result<OrderItem>.Failure(ResultCodes.ExtraNotFound);
                    }

                    extrasTotal += extra.Price;

                    orderItemExtras.Add(new OrderItemExtra
                    {
                        ExtraId = extraId,
                        Price = extra.Price,
                    });
                }
            }

            decimal lineTotal = CalculateLineTotal(unitPrice, extrasTotal, item.Quantity);

            var orderItem = new OrderItem
            {
                MenuItemSizeId = item.MenuItemSizeId,
                Quantity = item.Quantity,
                UnitPrice = unitPrice,
                DiscountAmount = 0,
                LineTotal = lineTotal,
                OrderItemExtras = orderItemExtras
            };

            return Result<OrderItem>.Success(orderItem);
        }
    

        private decimal CalculateLineTotal(decimal unitPrice, decimal extrasTotal, int quantity)
        {
            return (unitPrice + extrasTotal) * quantity;
        }

    }
}
