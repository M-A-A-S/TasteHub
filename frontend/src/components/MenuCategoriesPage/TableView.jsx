import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import { safeCall } from "../../utils/utils";

const TableView = ({
  categories,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  const { translations } = useLanguage();
  const { nameEn, nameAr, descriptionEn, descriptionAr, actions } =
    translations.pages.categories_page;

  const onEdit = safeCall(handleEditCategory);
  const onDelete = safeCall(handleDeleteCategory);

  const onEdit = safeCall(handleEditExtra);
  const onDelete = safeCall(handleDeleteExtra);

  return (
    <Table
      headers={[nameEn, nameAr, descriptionEn, descriptionAr, actions]}
      data={categories?.map((caegory) => ({
        nameEn: <small>{caegory.nameEn}</small>,
        nameAr: <small>{caegory.nameAr}</small>,
        descriptionEn: <small className="">{caegory.descriptionEn}</small>,
        descriptionAr: <small>{caegory.descriptionAr}</small>,
        actions: (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(caegory)}
              className="p-2 text-blue-500 hover:bg-blue-100 rounded"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(caegory)}
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
