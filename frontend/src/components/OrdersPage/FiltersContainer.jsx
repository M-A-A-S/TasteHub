import { FilterIcon, X } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import SortingFilter from "../MenuItemsPage/SortingFilter";
import Input from "../UI/Input";
import FilterSelectOrderType from "./FilterSelectOrderType";
import FilterSelectOrderStatus from "./FilterSelectOrderStatus";
import FilterDateRange from "./FilterDateRange";

const FiltersContainer = ({
  searchText,
  handleSearchInputChange,
  sortBy,
  handleSortByChange,
  orderStatus,
  handleOrderStatusChange,
  orderType,
  handleOrderTypeChange,
  fromDate,
  handleFromDateChange,
  toDate,
  handleToDateChange,
  handleClearFilters,
}) => {
  const { translations } = useLanguage();
  const { clear, Search, start_searching, from, to } = translations.common;

  console.log("searchText -> ", searchText);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 w-full">
        <Input
          className="flex-1 min-w-[200px]"
          label={Search}
          name="menu_item_search"
          placeholder={start_searching}
          type="search"
          value={searchText}
          onChange={handleSearchInputChange}
        />

        <div className="flex-1 min-w-[200px]">
          <SortingFilter value={sortBy} onChange={handleSortByChange} />
        </div>

        <div className="flex-1 min-w-[200px]">
          <FilterSelectOrderType
            value={orderType}
            onChange={handleOrderTypeChange}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <FilterSelectOrderStatus
            value={orderStatus}
            onChange={handleOrderStatusChange}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <FilterDateRange
            from={fromDate}
            fromLabel={from}
            onChangeFrom={handleFromDateChange}
            to={toDate}
            toLabel={to}
            onChangeTo={handleToDateChange}
          />
        </div>
      </div>
      {(searchText ||
        sortBy ||
        fromDate ||
        toDate ||
        orderType != "" ||
        orderStatus != "") && (
        <button
          type="button"
          onClick={handleClearFilters}
          className="flex items-center gap-1 rounded-md border 
          border-gray-300 dark:border-gray-600 px-3 py-2 text-sm 
          transition hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <X className="h-4 w-4" />
          {clear}
        </button>
      )}
    </>
  );
};
export default FiltersContainer;
