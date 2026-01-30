import React from "react";
import { safeCall } from "../../utils/utils";
import { useLanguage } from "../../hooks/useLanguage";
import { Pencil, Ruler, Trash2 } from "lucide-react";

const SizeCard = ({ size, handleEditExtra, handleDeleteExtra }) => {
  console.log("Rendering SizeCard for size:", size);
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
          <Ruler size={18} />
        </span>
        {language === "en" ? size.nameEn : size.nameAr}
      </h3>

      <div className="flex items-center justify-between pt-2">
        <span className="text-lg font-bold text-green-600">
          ${Number(size?.priceModifier ?? 0).toFixed(2)}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          onClick={() => onEdit(size)}
          className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(size)}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default SizeCard;
