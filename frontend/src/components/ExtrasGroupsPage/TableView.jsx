import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import { safeCall } from "../../utils/utils";

const TableView = ({
  extrasGroups,
  handleEditExtrasGroup,
  handleDeleteExtrasGroup,
}) => {
  const { language, translations } = useLanguage();

  const { nameEn, nameAr, is_it_required, maxSelect, actions } =
    translations.pages.extras_groups_page;

  const onEdit = safeCall(handleEditExtrasGroup);
  const onDelete = safeCall(handleDeleteExtrasGroup);

  return (
    <Table
      headers={[nameEn, nameAr, is_it_required, maxSelect, actions]}
      data={extrasGroups?.map((extrasGroup) => ({
        nameEn: <small>{extrasGroup.nameEn}</small>,
        nameAr: <small>{extrasGroup.nameAr}</small>,
        required: (
          <small className="flex items-center gap-1">
            {extrasGroup.required ? (
              <>
                <CheckCircle size={14} className="text-red-600" />
                {language === "en" ? "Yes" : "نعم"}
              </>
            ) : (
              <>
                <XCircle size={14} className="text-gray-400" />
                {language === "en" ? "No" : "لا"}
              </>
            )}
          </small>
        ),

        maxSelect: (
          <small className="font-medium">{extrasGroup.maxSelect}</small>
        ),

        actions: (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(extrasGroup)}
              className="p-2 text-blue-500 hover:bg-blue-100 rounded"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(extrasGroup)}
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
