import { Layers, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";

const IngredientCard = ({
  ingredient,
  handleEditIngredient,
  handleDeleteIngredient,
}) => {
  const onEdit = safeCall(handleEditIngredient);
  const onDelete = safeCall(handleDeleteIngredient);

  const { language, translations } = useLanguage();

  const unitLabel =
    translations.ingredient_units[ingredient.unitKey || ingredient.unit] ||
    ingredient.unitKey ||
    ingredient.unit;

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
        {language === "en" ? ingredient.nameEn : ingredient.nameAr}
      </h3>

      {/* Details */}
      <div className="mt-3 text-sm space-y-1">
        <p>
          <span className="font-medium">
            {translations.pages.ingredients_page.form.unit_label}:{" "}
          </span>
          {unitLabel}
        </p>
        <p>
          <span className="font-medium">
            {translations.pages.ingredients_page.form.low_stock_threshold_label}
            :{" "}
          </span>
          {ingredient.lowStockThreshold}
        </p>
        {ingredient.supplier?.name && (
          <p>
            <span className="font-medium">
              {translations.pages.ingredients_page.form.supplier_label}:{" "}
            </span>
            {ingredient.supplier.name}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          onClick={() => onEdit(ingredient)}
          className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(ingredient)}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
export default IngredientCard;
