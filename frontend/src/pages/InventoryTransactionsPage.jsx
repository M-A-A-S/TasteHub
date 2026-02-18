import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import CardView from "../components/InventoryTransactionsPage/CardView";
import TableView from "../components/InventoryTransactionsPage/TableView";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import { StockMovementReasons } from "../utils/constants";

const InventoryTransactionsPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [inventoryTransactions, setInventoryTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const { translations } = useLanguage();
  const { title, description } = translations.pages.inventory_transactions_page;
  const { empty_state, loading_error } = translations.common;

  const fetchInventoryTransactions = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("inventory-transactions");
      console.log("result", result);
      setInventoryTransactions(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryTransactions();
  }, []);

  function getReasonName(reason) {
    const reasonObj = StockMovementReasons.find((s) => s?.value === reason);
    if (!reasonObj) {
      return reason;
    }
    return translations.stock_movement_reasons?.[reasonObj?.key] ?? reason;
  }

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
      ) : inventoryTransactions?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              inventoryTransactions={inventoryTransactions}
              getReasonName={getReasonName}
            />
          )}
          {view == "table" && (
            <TableView
              inventoryTransactions={inventoryTransactions}
              getReasonName={getReasonName}
            />
          )}
        </>
      )}
    </div>
  );
};
export default InventoryTransactionsPage;
