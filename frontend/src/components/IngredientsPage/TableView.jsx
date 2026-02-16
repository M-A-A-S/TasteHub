import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { IngredientUnits } from "../../utils/constants";
import { safeCall } from "../../utils/utils";
import Table from "../UI/Table";

const TableView = ({
  ingredients,
  handleEditIngredient,
  handleDeleteIngredient,
  getUnitName,
}) => {
  const { translations, language } = useLanguage();

  const onEdit = safeCall(handleEditIngredient);
  const onDelete = safeCall(handleDeleteIngredient);

  const {
    table_headers: { name, unit, low_stock_threshold, supplier, actions },
  } = translations.pages.ingredients_page;

  const headers = [name, unit, low_stock_threshold, supplier, actions];
  const data = ingredients?.map((ingredient) => ({
    name: (
      <small>
        {language == "en" ? ingredient?.nameEn : ingredient?.nameAr}
      </small>
    ),
    unit: <small>{getUnitName(ingredient?.unit)}</small>,
    low_stock_threshold: <small>{ingredient?.lowStockThreshold}</small>,
    supplier: (
      <small>
        {ingredient?.supplier?.name
          ? ingredient.supplier.person?.firstName +
            " " +
            ingredient.supplier.person?.lastName
          : translations.pages.ingredients_page.no_supplier || "—"}
      </small>
    ),
    actions: (
      <div className="flex items-center justify-center gap-3">
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
    ),
  }));

  return <Table headers={headers} data={data} />;
};
export default TableView;
