import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { formatMoney, safeCall } from "../../utils/utils";
import Table from "../UI/Table";

const TableView = ({ extras, handleEditExtra, handleDeleteExtra }) => {
  const { translations, language } = useLanguage();
  const { name, extra_group, price, actions } =
    translations.pages.extras_page.table_headers;

  const onEdit = safeCall(handleEditExtra);
  const onDelete = safeCall(handleDeleteExtra);

  return (
    <Table
      headers={[name, extra_group, price, actions]}
      data={extras?.map((extra) => ({
        name: <small>{language == "en" ? extra.nameEn : extra.nameAr}</small>,
        extra_group: (
          <small className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 w-fit">
            {language == "en" ? extra.group?.nameEn : extra.group?.nameAr}
          </small>
        ),

        price: <small>{formatMoney(extra?.price)}</small>,
        actions: (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(extra)}
              className="p-2 text-blue-500 hover:bg-blue-100 rounded"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(extra)}
              className="p-2 text-red-500 hover:bg-red-100 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      }))}
    />
  );
};
export default TableView;
