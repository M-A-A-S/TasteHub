import { ChefHat, Layers2, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";

const ExtraCard = ({ extra, handleEditExtra, handleDeleteExtra }) => {
  const { language } = useLanguage();

  const onEdit = safeCall(handleEditExtra);
  const onDelete = safeCall(handleDeleteExtra);

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
    hover:shadow-md transition border border-transparent p-3"
    >
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <ChefHat size={18} />
        </span>
        {language === "en" ? extra.nameEn : extra.nameAr}
      </h3>

      {extra?.group && (
        <p
          className="text-xs px-2 py-1 my-1
        rounded-full bg-orange-100 text-orange-700 w-fit"
        >
          {language === "en" ? extra.group.nameEn : extra.group.nameAr}
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        <span className="text-lg font-bold text-orange-600">
          ${Number(extra?.price ?? 0).toFixed(2)}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          onClick={() => onEdit(extra)}
          className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(extra)}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
export default ExtraCard;
