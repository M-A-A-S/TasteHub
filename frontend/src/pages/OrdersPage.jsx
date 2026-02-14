import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";
import PageHeader from "../components/PageHeader";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import Pagination from "../components/UI/Pagination";
import CardView from "../components/OrdersPage/CardView";
import TableView from "../components/OrdersPage/TableView";
import FiltersContainer from "../components/OrdersPage/FiltersContainer";
import { SORTING_TERMS } from "../utils/constants";
import { useDebounce } from "../hooks/useDebounce";

const OrdersPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  // Filters
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderType, setOrderType] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Items per page
  const debouncedSearch = useDebounce(searchText, 500);

  const { translations } = useLanguage();

  const { title, description } = translations.pages.orders_page;
  const { loading_error, empty_state } = translations.common;

  const fetchOrders = async () => {
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

      if (orderType != "") {
        queryParams.append("orderType", orderType);
      }
      if (orderStatus != "") {
        queryParams.append("orderStatus", orderStatus);
      }
      if (fromDate != "") {
        queryParams.append("from", fromDate);
      }
      if (toDate != "") {
        queryParams.append("to", toDate);
      }

      queryParams.append("sortBy", sortBy || SORTING_TERMS.NEWEST);

      const url = `orders?${queryParams.toString()}`;
      result = await read(url);
      console.log("result", result);
      setOrders(result?.data?.items || []);
      setTotalMenuItems(result?.data?.total || 0);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setErrorCode(result?.code);
      setOrders([]);
      setTotalMenuItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [
    currentPage,
    pageSize,
    sortBy,
    orderType,
    orderStatus,
    debouncedSearch,
    fromDate,
    toDate,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchInputChange = (e) => {
    console.log("search -> ", e.target.value);
    setSearchText(e.target.value);
    setSortBy(SORTING_TERMS.NEWEST);
    setCurrentPage(1);
  };

  const handleOrderTypeChange = (e) => {
    console.log("Sorting Term -> ", e.target.value);
    setOrderType(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderStatusChange = (e) => {
    console.log("Sorting Term -> ", e.target.value);
    setOrderStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSortByChange = (e) => {
    console.log("Sorting Term -> ", e.target.value);
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleFromDateChange = (e) => {
    console.log("From date -> ", e.target.value);
    setFromDate(e.target.value);
    setCurrentPage(1);
  };

  const handleToDateChange = (e) => {
    console.log("To date -> ", e.target.value);
    setToDate(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSortBy("");
    setOrderStatus("");
    setOrderType("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  return (
    <div>
      <PageHeader title={title} description={description} />

      <FiltersContainer
        searchText={searchText}
        handleSearchInputChange={handleSearchInputChange}
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}
        orderStatus={orderStatus}
        handleOrderStatusChange={handleOrderStatusChange}
        orderType={orderType}
        handleOrderTypeChange={handleOrderTypeChange}
        fromDate={fromDate}
        handleFromDateChange={handleFromDateChange}
        toDate={toDate}
        handleToDateChange={handleToDateChange}
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
      ) : orders.length === 0 ? (
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
          {view == "card" && <CardView orders={orders} />}
          {view == "table" && <TableView orders={orders} />}
          <Pagination
            currentPage={currentPage}
            totalItems={totalMenuItems}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        </>
      )}
    </div>
  );
};
export default OrdersPage;
