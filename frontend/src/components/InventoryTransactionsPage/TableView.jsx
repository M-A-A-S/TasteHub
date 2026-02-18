import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";

const TableView = ({ inventoryTransactions, getReasonName }) => {
  const { translations, language } = useLanguage();

  const {
    table_headers: { ingredient, type, reason, quantity, date, batch_number },
  } = translations.pages.inventory_transactions_page;

  const headers = [ingredient, type, reason, quantity, date, batch_number];

  const data = inventoryTransactions?.map((tx) => {
    const movementLabel =
      tx.stockMovementType === 0
        ? translations.stock_movement_types.out
        : translations.stock_movement_types.in;

    return {
      ingredient: (
        <small>
          {language === "en"
            ? tx.ingredientBatch.ingredient.nameEn
            : tx.ingredientBatch.ingredient.nameAr}
        </small>
      ),
      type: (
        <span
          className={`px-2 py-0.5 rounded-full text-white text-xs ${
            tx.stockMovementType === 0 ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {movementLabel}
        </span>
      ),
      reason: <small>{getReasonName(tx.stockMovementReason)}</small>,
      quantity: <small>{tx.quantity}</small>,
      date: (
        <small>
          {new Date(tx.inventoryTransactionDate).toLocaleString(
            language === "en" ? "en-US" : "ar-EG",
          )}
        </small>
      ),
      batch_number: <small>{tx.ingredientBatch.batchNumber}</small>,
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
