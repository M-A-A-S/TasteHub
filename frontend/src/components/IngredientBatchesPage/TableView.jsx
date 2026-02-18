import { useLanguage } from "../../hooks/useLanguage";
import { formatDate } from "../../utils/utils";
import Table from "../UI/Table";

const TableView = ({ ingredientBatches }) => {
  const { translations, language } = useLanguage();

  const {
    table_headers: {
      ingredient,
      batch_number,
      quantity,
      cost_per_unit,
      expiry_date,
      created_at,
    },
  } = translations.pages.ingredient_batches_page;

  const headers = [
    ingredient,
    batch_number,
    quantity,
    cost_per_unit,
    expiry_date,
    created_at,
  ];

  const data = ingredientBatches?.map((batch) => {
    return {
      ingredient: (
        <small>
          {language === "en"
            ? batch.ingredient?.nameEn
            : batch.ingredient?.nameAr}
        </small>
      ),

      batch_number: <small>{batch.batchNumber}</small>,

      quantity: <small>{batch.quantity}</small>,

      cost_per_unit: <small>{batch.costPerUnit}</small>,

      expiry_date: <small>{formatDate(batch.expiryDate)}</small>,

      created_at: <small>{formatDate(batch.createdAt)}</small>,
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
