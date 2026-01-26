import { use, useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import { useDebounce } from "../hooks/useDebounce";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import PageHeader from "../components/PageHeader";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import AddEditMenuItemModal from "../components/MenuItemsPage/AddEditMenuItemModal";
import CardView from "../components/MenuItemsPage/CardView";
import TableView from "../components/MenuItemsPage/TableView";
import ConfirmModal from "../components/UI/ConfirmModal";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import Pagination from "../components/UI/Pagination";
import FiltersContainer from "../components/MenuItemsPage/FiltersContainer";
import { SORTING_TERMS } from "../utils/constants";

const MenuItemsPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditMenuItemModalOpen, setIsAddEditMenuItemModalOpen] =
    useState(false);
  const [
    isDeleteMenuItemConfirmModalOpen,
    setIsDeleteMenuItemConfirmModalOpen,
  ] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  // Filters
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Items per page

  const { translations } = useLanguage();

  const {
    title,
    description,
    add_new_item,
    menu_item_add_success,
    menu_item_add_fail,
    menu_item_update_success,
    menu_item_update_fail,
    menu_item_delete_success,
    menu_item_delete_fail,
    menu_item_delete_modal_title,
    menu_item_delete_modal_message,
    menu_item_delete_modal_confirm,
  } = translations.pages.menu_page;

  const { cancel, loading_error, empty_state } = translations.common;

  const debouncedSearch = useDebounce(searchText, 500);

  const fetchMenuItems = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      const queryParams = new URLSearchParams();

      queryParams.append("pageNumber", currentPage);
      queryParams.append("pageSize", pageSize);

      if (debouncedSearch?.trim() !== "") {
        queryParams.append("searchTerm", debouncedSearch.trim());
      }

      queryParams.append("sortBy", sortBy || SORTING_TERMS.NEWEST);

      if (categoryId > 0) {
        queryParams.append("categoryId", parseInt(categoryId));
      }

      const url = `menu-items?${queryParams.toString()}`;
      result = await read(url);
      setMenuItems(result?.data?.items || []);
      setTotalMenuItems(result?.data?.total || 0);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      setErrorCode(result?.code);
      setMenuItems([]);
      setTotalMenuItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [debouncedSearch, categoryId, sortBy, currentPage, pageSize]);

  function handleDeleteMenuItem(menuItem) {
    setSelectedMenuItem(menuItem);
    setIsDeleteMenuItemConfirmModalOpen(true);
    console.log("MenuItem -> ", menuItem);
  }
  function handleEditMenuItem(menuItem) {
    setSelectedMenuItem(menuItem);
    setIsAddEditMenuItemModalOpen(true);
    console.log("MenuItem -> ", menuItem);
  }

  function handleAddMenuItem() {
    setSelectedMenuItem(null);
    setIsAddEditMenuItemModalOpen(true);
  }

  const handleSearchInputChange = (e) => {
    console.log("search -> ", e.target.value);
    setSearchText(e.target.value);
    setSortBy(SORTING_TERMS.NEWEST);
    setCurrentPage(1);
  };

  const handleSortByChange = (e) => {
    console.log("Sorting Term -> ", e.target.value);
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSortBy("");
    setCurrentPage(1);
  };

  const closeModal = () => {
    setIsAddEditMenuItemModalOpen(false);
    setIsDeleteMenuItemConfirmModalOpen(false);
    setSelectedMenuItem(null);
    // toast.success("Success! Operation completed.");
    // toast.error("Error! Something went wrong.");
    // toast.warning("Warning! Check this out.");
    // toast.default("Default info message.");
  };

  function addEditMenuItem(payload) {
    if (selectedMenuItem) {
      updateMenuItem(payload);
    } else {
      addMenuItem(payload);
    }
  }

  async function addMenuItem(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`menu-items`, payload);
      setMenuItems((prev) => [...prev, result.data]);
      showSuccess(result?.code, menu_item_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateMenuItem(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(`menu-items/${selectedMenuItem?.id}`, payload);
      setMenuItems((prev) =>
        prev.map((cat) => (cat.id === result?.data?.id ? result.data : cat)),
      );
      showSuccess(result?.code, menu_item_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteMenuItem() {
    let result;
    try {
      setActionLoading(true);
      result = await remove(`menu-items/${selectedMenuItem.id}`);

      setMenuItems((prev) =>
        prev.filter((cat) => cat.id != selectedMenuItem.id),
      );
      setTotalMenuItems((prev) => prev - 1);
      showSuccess(result?.code, menu_item_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_delete_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAddMenuItem}>
            <Plus /> {add_new_item}
          </Button>
        }
      />

      <FiltersContainer
        searchText={searchText}
        handleSearchInputChange={handleSearchInputChange}
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}
        handleClearFilters={handleClearFilters}
      />

      {loading ? (
        <div className="grid place-items-center h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : errorCode ? (
        <div className="grid place-items-center h-[60vh] text-red-500">
          {translations.server_codes[errorCode] || loading_error}
        </div>
      ) : menuItems.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          <Pagination
            currentPage={currentPage}
            totalItems={totalMenuItems}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
          {view == "card" && (
            <CardView
              menuItems={menuItems}
              handleEditMenuItem={handleEditMenuItem}
              handleDeleteMenuItem={handleDeleteMenuItem}
            />
          )}
          {view == "table" && (
            <TableView
              menuItems={menuItems}
              handleEditMenuItem={handleEditMenuItem}
              handleDeleteMenuItem={handleDeleteMenuItem}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalItems={totalMenuItems}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        </>
      )}

      <AddEditMenuItemModal
        show={isAddEditMenuItemModalOpen}
        onClose={closeModal}
        onConfirm={addEditMenuItem}
        menuItem={selectedMenuItem}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteMenuItemConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteMenuItem}
        title={menu_item_delete_modal_title}
        message={menu_item_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={menu_item_delete_modal_confirm}
      />
    </div>
  );
};
export default MenuItemsPage;
