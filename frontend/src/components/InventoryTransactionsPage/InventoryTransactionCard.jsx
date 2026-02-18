import { Layers } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { StockMovementType } from "../../utils/constants";
import { formatDate } from "../../utils/utils";

const InventoryTransactionCard = ({ inventoryTransaction, getReasonName }) => {
  const { language, translations } = useLanguage();

  const {
    table_headers: {
      type,
      reason,
      quantity,
      date,
      batch_number,
      remaining_quantity,
    },
  } = translations.pages.inventory_transactions_page;

  const { in: inLabel, out } = translations.stock_movement_types;

  const movementTypeLabel =
    inventoryTransaction.stockMovementType === StockMovementType.OUT
      ? out
      : inLabel;

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
    hover:shadow-md transition border border-transparent p-3"
    >
      {/* Title */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <Layers size={18} />
        </span>
        {language === "en"
          ? inventoryTransaction.ingredientBatch.ingredient.nameEn
          : inventoryTransaction.ingredientBatch.ingredient.nameAr}
      </h3>

      {/* Details */}
      <div className="mt-3 text-sm space-y-1">
        <p>
          <span className="font-medium">{type}: </span>
          <span
            className={`px-2 py-0.5 rounded-full text-white text-xs ${
              inventoryTransaction.stockMovementType === StockMovementType.OUT
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            {movementTypeLabel}
          </span>
        </p>

        <p>
          <span className="font-medium">{reason}: </span>
          {getReasonName(inventoryTransaction.stockMovementReason)}
        </p>
        <p>
          <span className="font-medium">{quantity}: </span>
          {inventoryTransaction.quantity}
        </p>
        <p>
          <span className="font-medium">{date}: </span>
          {formatDate(inventoryTransaction.inventoryTransactionDate)}
        </p>
        <p>
          <span className="font-medium">{batch_number}: </span>
          {inventoryTransaction.ingredientBatch.batchNumber}
        </p>
        <p>
          <span className="font-medium">{remaining_quantity}: </span>
          <span
            className={
              inventoryTransaction.ingredientBatch.remainingQuantity < 10
                ? "text-red-500 font-semibold"
                : ""
            }
          >
            {inventoryTransaction.ingredientBatch.remainingQuantity}
          </span>
        </p>
      </div>
    </div>
  );
};
export default InventoryTransactionCard;
