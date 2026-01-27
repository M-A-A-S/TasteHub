import { Layers, Pencil, Trash2, CheckCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";

const ExtrasGroupCard = ({
  extrasGroup,
  handleDeleteExtrasGroup,
  handleEditExtrasGroup,
}) => {
  const { language } = useLanguage();

  const onEdit = safeCall(handleEditExtrasGroup);
  const onDelete = safeCall(handleDeleteExtrasGroup);
  console.log("Rendering ExtrasGroupCard for:", extrasGroup);
  return (
    <div
      className="
        bg-white dark:bg-slate-800
        rounded-xl shadow-sm
        hover:shadow-md transition
        border border-transparent
        p-3
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 font-semibold text-lg">
          <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
            <Layers size={18} />
          </span>
          {language === "en" ? extrasGroup.nameEn : extrasGroup.nameAr}
        </h3>

        {/* Required badge */}
        {extrasGroup.required && (
          <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <CheckCircle size={12} />
            {language === "en" ? "Required" : "إجباري"}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {language === "en" ? (
          <span>
            Max selections: <strong>{extrasGroup.maxSelect}</strong>
          </span>
        ) : (
          <span>
            الحد الأقصى للاختيار: <strong>{extrasGroup.maxSelect}</strong>
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
        <button
          onClick={() => onEdit(extrasGroup)}
          className="p-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(extrasGroup)}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ExtrasGroupCard;
