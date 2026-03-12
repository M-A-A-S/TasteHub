import { useLanguage } from "../../hooks/useLanguage";
import CategoryFilterButtons from "../CategoryFilterButtons";
import TableSelect from "../TableSelect";
import Input from "../UI/Input";
import SortingFilter from "./SortingFilter";

// searchText = { searchText };
// handleSearchInputChange = { handleSearchInputChange };
// sortBy = { sortBy };
// categoryId = { categoryId };
// handleCategoryChange = { handleCategoryChange };
// handleSortByChange = { handleSortByChange };
// handleClearFilters = { handleClearFilters };

const FiltersContainer = ({
  searchText,
  handleSearchInputChange,
  sortBy,
  handleSortByChange,
  categoryId,
  handleCategoryChange,
  tableId,
  setTableId,
  className,
}) => {
  const { translations } = useLanguage();
  const { clear, Search, start_searching } = translations.common;

  return (
    <div className={className}>
      <div className="flex gap-1 items-center">
        <Input
          className="flex-1"
          label={Search}
          name="menu_item_search"
          placeholder={start_searching}
          type="search"
          value={searchText}
          onChange={handleSearchInputChange}
        />
        {/* <Input
          className="w-fit"
          type="number"
          value={tableNumber}
          placeholder="T#"
          onChange={(e) => handleTableNumberChange(e.target.value)}
          label={"table_number"}
        /> */}

        <TableSelect
          name="menuCategoryId"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          label={"table_number"}
          // errorMessage={errors.tableId}
        />
      </div>

      <SortingFilter value={sortBy} onChange={handleSortByChange} />

      <CategoryFilterButtons
        value={categoryId}
        onChange={handleCategoryChange}
      />
    </div>
  );
};
export default FiltersContainer;
