import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import IngredientActions from "./IngredientActions";

const TableView = ({
  ingredients,
  handleEditIngredient,
  handleDeleteIngredient,
  handleAdjustStock,
  getUnitName,
}) => {
  const { translations, language } = useLanguage();

  const {
    table_headers: {
      name,
      unit,
      current_stock,
      low_stock_threshold,
      supplier,
      actions,
    },
  } = translations.pages.ingredients_page;

  const headers = [
    name,
    unit,
    current_stock,
    low_stock_threshold,
    supplier,
    actions,
  ];
  const data = ingredients?.map((ingredient) => ({
    name: (
      <small>
        {language == "en" ? ingredient?.nameEn : ingredient?.nameAr}
      </small>
    ),
    unit: <small>{getUnitName(ingredient?.unit)}</small>,
    current_stock: <small>{ingredient?.currentStock}</small>,
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
      <IngredientActions
        ingredient={ingredient}
        handleAdjustStock={handleAdjustStock}
        handleDeleteIngredient={handleDeleteIngredient}
        handleEditIngredient={handleEditIngredient}
        className={"justify-center"}
      />
    ),
  }));

  return <Table headers={headers} data={data} />;
};
export default TableView;
