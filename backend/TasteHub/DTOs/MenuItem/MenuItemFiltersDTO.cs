using TasteHub.Enums;

namespace TasteHub.DTOs.MenuItem
{
    public class MenuItemFiltersDTO
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int? CategoryId { get; set; }
        public string? SearchTerm { get; set; } = string.Empty;
        public MenuItemSortBy? SortBy { get; set; } = MenuItemSortBy.Newest;
    }
}
