using Azure.Core;
using Microsoft.EntityFrameworkCore;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs;
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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IInventoryService _inventoryService;

        public OrderService(
            IUnitOfWork unitOfWork,
            IInventoryService inventoryService
            )
        {
            _unitOfWork = unitOfWork;
            _inventoryService = inventoryService;
        }

        public async Task<Result<PagedResult<OrderDTO>>> GetFilteredAsync(
    OrderFiltersDTO filters)
        {
            var getOrdersResult = await _unitOfWork.Orders.GetOrdersWithDetailsAsync(filters);

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

            }).ToList() ?? new List<OrderDTO>();
            
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

            // Prepare OrderItems
            var orderItemsResult = await PrepareOrderItemsAsync(request.Items); 

            if (!orderItemsResult.IsSuccess || orderItemsResult.Data == null || !orderItemsResult.Data.Any())
            {
                return Result<OrderDTO>.Failure(ResultCodes.MenuItemsNotFound);
            }

            var orderItems = orderItemsResult.Data.ToList();

            // Create Order entity
            var order = new Order
            {
                TableId = request.TableId,
                UserId = 1, // TODO: get it form logged in user
                OrderStatus = OrderStatus.Pending,
                OrderType = OrderType.DineIn, // TODO: get it from frontend
                OrderItems = orderItems
            };

            order.SubtotalAmount = orderItems.Sum(item => item.LineTotal);
            order.DiscountAmount = 0;
            order.TaxAmount = 0;
            order.GrandTotal = order.SubtotalAmount + order.TaxAmount;

            // Deduct inventory
            var ingredientDeductions = orderItems.SelectMany(oi =>
            {
                var ingredients = oi.MenuItemSize?.MenuItem?.MenuItemIngredients
                                    ?? oi.MenuItem?.MenuItemIngredients
                                    ?? Enumerable.Empty<MenuItemIngredient>();

                return ingredients.Select(i => new IngredientDeduction
                {
                    IngredientId = i.IngredientId,
                    Quantity = i.QuantityPerUnit * oi.Quantity
                });
            }).ToList();

            var deductionResult = await _inventoryService.DeductIngredientsAsync(ingredientDeductions, order.UserId);
            if (!deductionResult.IsSuccess)
            {
                return Result<OrderDTO>.Failure(deductionResult.Code);
            }

            var createOrderResult = await _unitOfWork.Orders.AddAsync(order);
            if (!createOrderResult.IsSuccess)
            {
                return Result<OrderDTO>.Failure(createOrderResult.Code);
            }

            await _unitOfWork.SaveChangesAsync();

            var fullOrderResult = await _unitOfWork.Orders.GetOrderWithDetailsAsync(createOrderResult.Data.Id);

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
    
        private async Task<Result<IEnumerable<OrderItem>>> PrepareOrderItemsAsync(IEnumerable<CreateOrderItemRequest> items)
        {
            var menuItemSizeIds = items
            .Where(x => x.MenuItemSizeId > 0)
            .Select(x => x.MenuItemSizeId)
            .Distinct()
            .ToList();

            var menuItemIds = items
                .Where(x => x.MenuItemId > 0)
                .Select(x => x.MenuItemId)
                .Distinct()
                .ToList();

            var extraIds = items
                .Where(x => x.ExtrasIds != null)
                .SelectMany(x => x.ExtrasIds)
                .Distinct()
                .ToList();

            var menuItemSizesResult = await _unitOfWork.MenuItemSizes.GetAllAsync(x => menuItemSizeIds.Contains(x.Id));
            var menuItemsResult = await _unitOfWork.MenuItems.GetAllAsync(x => menuItemIds.Contains(x.Id));
            var extrasResult = await _unitOfWork.Extras.GetAllAsync(x => extraIds.Contains(x.Id));

            if ((!menuItemSizesResult.IsSuccess && menuItemSizeIds.Any()) ||
                (!menuItemsResult.IsSuccess && menuItemIds.Any()) ||
                (!extrasResult.IsSuccess && extraIds.Any()))
            {
                return Result<IEnumerable<OrderItem>>.Failure();
            }

            var menuItemSizes = menuItemSizesResult.Data?.ToDictionary(x => x.Id) ?? new Dictionary<int, MenuItemSize>();
            var menuItems = menuItemsResult.Data?.ToDictionary(x => x.Id) ?? new Dictionary<int, MenuItem>();
            var extras = extrasResult.Data?.ToDictionary(x => x.Id) ?? new Dictionary<int, Extra>();

            var orderItems = new List<OrderItem>();
            foreach (var item in items)
            {
                var orderItemResult = CreateOrderItem(item, menuItemSizes, menuItems, extras);
                if (orderItemResult.IsSuccess)
                {
                    orderItems.Add(orderItemResult.Data);
                }              
            }
            return Result<IEnumerable<OrderItem>>.Success(orderItems);
        }

        private Result<OrderItem> CreateOrderItem(
            CreateOrderItemRequest item,
            Dictionary<int, MenuItemSize> menuItemSizes,
            Dictionary<int, MenuItem> menuItems,
            Dictionary<int, Extra> extras
            )
        {
            decimal unitPrice = 0;
            int? menuItemSizeId = null;
            int? menuItemId = null;


            if (item.MenuItemSizeId > 0 && 
                menuItemSizes.TryGetValue(item.MenuItemSizeId, out var menuItemSize))
            {
                unitPrice = menuItemSize.Price;
                menuItemSizeId = menuItemSize.Id;
            }
            else if (menuItems.TryGetValue(item.MenuItemId, out var menuItem))
            {
                unitPrice = menuItem.Price;
                menuItemId = menuItem.Id;
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
                MenuItemSizeId = menuItemSizeId,
                MenuItemId = menuItemId,
                Quantity = item.Quantity,
                UnitPrice = unitPrice,
                DiscountAmount = 0,
                LineTotal = lineTotal,
                OrderItemExtras = orderItemExtras,
                //MenuItem = menuItem,
                //MenuItemSize = menuItemSize.ToEntity()
            };

            return Result<OrderItem>.Success(orderItem);
        }
    

        private decimal CalculateLineTotal(decimal unitPrice, decimal extrasTotal, int quantity)
        {
            return (unitPrice + extrasTotal) * quantity;
        }

    }
}
