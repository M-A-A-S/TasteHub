import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";
import PageHeader from "../components/PageHeader";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import Pagination from "../components/UI/Pagination";
import CardView from "../components/OrdersPage/CardView";
import TableView from "../components/OrdersPage/TableView";

const OrdersPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Items per page

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
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <PageHeader title={title} description={description} />

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
