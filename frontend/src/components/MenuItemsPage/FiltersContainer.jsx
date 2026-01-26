import { X } from "lucide-react";
import Input from "../UI/Input";
import { useLanguage } from "../../hooks/useLanguage";
import SortingFilter from "./SortingFilter";

const FiltersContainer = ({
  searchText,
  handleSearchInputChange,
  sortBy,
  handleSortByChange,
  handleClearFilters,
}) => {
  const { translations } = useLanguage();
  const { clear, Search, start_searching } = translations.common;

  return (
    <div className="flex flex-col items-start md:flex-row md:items-center md:justify-start gap-4 ">
      <Input
        className="flex-1 w-full"
        label={Search}
        name="menu_item_search"
        placeholder={start_searching}
        type="search"
        value={searchText}
        onChange={handleSearchInputChange}
      />
      <div className="flex-1 w-full">
        <SortingFilter value={sortBy} onChange={handleSortByChange} />
      </div>
      {(searchText || sortBy) && (
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
    </div>
  );
};
export default FiltersContainer;
