import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import Table from "../UI/Table";

const TableView = ({ sizes, handleEditSize, handleDeleteSize }) => {
  console.log("Rendering TableView with sizes:", sizes);
  const { translations, language } = useLanguage();
  const { name, price_modifier, actions } =
    translations.pages.sizes_page.table_headers;
  const onEdit = safeCall(handleEditSize);
  const onDelete = safeCall(handleDeleteSize);
  return (
    <Table
      headers={[name, price_modifier, actions]}
      data={sizes?.map((size) => ({
        name: <small>{language == "en" ? size.nameEn : size.nameAr}</small>,
        price_modifier: <small>{size.priceModifier}</small>,
        actions: (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(size)}
              className="p-2 text-blue-500 hover:bg-blue-100 rounded"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(size)}
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
