import { Layers } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import IngredientActions from "./IngredientActions";

const IngredientCard = ({
  ingredient,
  handleEditIngredient,
  handleDeleteIngredient,
  getUnitName,
  handleAdjustStock,
}) => {
  const { language, translations } = useLanguage();

  const { unit_label, low_stock_threshold_label, supplier_label } =
    translations.pages.ingredients_page.form;

  const { current_stock } = translations.pages.ingredients_page;

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
          <span className="font-medium">{unit_label}: </span>
          {getUnitName(ingredient?.unit)}
        </p>
        <p>
          <span className="font-medium">{current_stock}: </span>
          {ingredient.currentStock}
        </p>
        <p>
          <span className="font-medium">{low_stock_threshold_label}: </span>
          {ingredient.lowStockThreshold}
        </p>

        {ingredient.supplier?.name && (
          <p>
            <span className="font-medium">{supplier_label}: </span>
            {ingredient.supplier.name}
          </p>
        )}
      </div>

      {/* Actions */}
      <IngredientActions
        ingredient={ingredient}
        handleAdjustStock={handleAdjustStock}
        handleDeleteIngredient={handleDeleteIngredient}
        handleEditIngredient={handleEditIngredient}
        className={"mt-4 pt-4 border-t border-gray-100 "}
      />
    </div>
  );
};
export default IngredientCard;
