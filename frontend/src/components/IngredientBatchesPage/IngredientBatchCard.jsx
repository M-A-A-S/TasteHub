import { Package } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { formatDate } from "../../utils/utils";

const IngredientBatchCard = ({ ingredientBatch }) => {
  const { language, translations } = useLanguage();

  const {
    table_headers: {
      batch_number,
      quantity,
      cost_per_unit,
      expiry_date,
      created_at,
    },
  } = translations.pages.ingredient_batches_page;

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
      hover:shadow-md transition border border-transparent p-3"
    >
      {/* Title */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <Package size={18} />
        </span>
        {language === "en"
          ? ingredientBatch.ingredient?.nameEn
          : ingredientBatch.ingredient?.nameAr}
      </h3>

      {/* Details */}
      <div className="mt-3 text-sm space-y-1">
        <p>
          <span className="font-medium">{batch_number}: </span>
          {ingredientBatch.batchNumber}
        </p>

        <p>
          <span className="font-medium">{quantity}: </span>
          {ingredientBatch.quantity}
        </p>

        <p>
          <span className="font-medium">{cost_per_unit}: </span>
          {ingredientBatch.costPerUnit}
        </p>

        <p>
          <span className="font-medium">{expiry_date}: </span>
          {formatDate(ingredientBatch.expiryDate)}
        </p>

        <p>
          <span className="font-medium">{created_at}: </span>
          {formatDate(ingredientBatch.createdAt)}
        </p>
      </div>
    </div>
  );
};
export default IngredientBatchCard;
