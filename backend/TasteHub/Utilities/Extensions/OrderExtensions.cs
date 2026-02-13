using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.DTOs.Order;
using TasteHub.DTOs.OrderItem;
using TasteHub.DTOs.OrderItemExtra;
using TasteHub.DTOs.Size;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class OrderExtensions
    {
        public static OrderDTO ToDTO(this Order order)
        {
            if (order == null)
            {
                return null;
            }

            return new OrderDTO
            {
                Id = order.Id,
                TableId = order.TableId,
                CustomerId = order.CustomerId,
                UserId = order.UserId,
                OrderStatus = order.OrderStatus,
                OrderType = order.OrderType,
                OrderDateTime = order.OrderDateTime,
                SubtotalAmount = order.SubtotalAmount,
                DiscountAmount = order.DiscountAmount,
                TaxAmount = order.TaxAmount,
                GrandTotal = order.GrandTotal,
                OrderItems = order.OrderItems?.Select(oi => new OrderItemDTO
                {
                    Id = oi.Id,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    LineTotal = oi.LineTotal,
                    MenuItemId = oi.MenuItemId,
                    MenuItem = oi.MenuItem == null ? null :  new MenuItemDTO
                    {
                        Id = oi.MenuItem.Id,
                        NameEn = oi.MenuItem.NameEn,
                        NameAr = oi.MenuItem.NameAr,
                        Price = oi.MenuItem.Price,
                        ImageUrl = oi.MenuItem.ImageUrl,
                    },
                    MenuItemSizeId = oi.MenuItemSizeId,
                    MenuItemSize = oi.MenuItemSize == null ? null : new MenuItemSizeDTO
                    {
                        Id = oi.MenuItemSize.Id,
                        Price = oi.MenuItemSize.Price,
                        SizeId = oi.MenuItemSize.SizeId,
                        MenuItem = oi.MenuItemSize.MenuItem == null ? null : new MenuItemDTO
                        {
                            Id = oi.MenuItemSize.MenuItem.Id,
                            NameEn = oi.MenuItemSize.MenuItem.NameEn,
                            NameAr = oi.MenuItemSize.MenuItem.NameAr,
                            Price = oi.MenuItemSize.MenuItem.Price,
                            ImageUrl = oi.MenuItemSize.MenuItem.ImageUrl,
                        },
                        Size = oi.MenuItemSize.Size == null ? null : new SizeDTO
                        {
                            Id = oi.MenuItemSize.Size.Id,
                            NameEn = oi.MenuItemSize.Size.NameEn,
                            NameAr = oi.MenuItemSize.Size.NameAr
                        }
                    },
                    OrderItemExtras = oi.OrderItemExtras?.Select(e => new OrderItemExtraDTO
                    {
                        Id = e.Id,
                        ExtraId = e.ExtraId,
                        Price = e.Price,
                        Extra = e.Extra == null ? null : new ExtraDTO
                        {
                            Id = e.Extra.Id,
                            NameEn = e.Extra.NameEn,
                            NameAr = e.Extra.NameAr,
                            Price = e.Extra.Price
                        }
                    }).ToList() ?? new List<OrderItemExtraDTO>()
                }).ToList() ?? new List<OrderItemDTO>()
            };

        }

    }
}
