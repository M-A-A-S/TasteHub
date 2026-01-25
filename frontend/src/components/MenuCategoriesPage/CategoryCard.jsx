import { Layers, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";

const CategoryCard = ({
  category,
  handleDeleteCategory,
  handleEditCategory,
}) => {
  const { language, translations } = useLanguage();
  const {
    title,
    description,
    add_new_category,
    empty_state,
    delete_success,
    delete_fail,
    delete_category_title,
    delete_category_message,
    delete_label,
    add_success,
    add_fail,
    update_success,
    update_fail,
  } = translations.pages.categories_page;

  const onEdit = safeCall(handleEditCategory);
  const onDelete = safeCall(handleDeleteCategory);

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
    hover:shadow-md transition border border-transparent p-3"
    >
      {/* Title */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <Layers size={18} />
        </span>
        {language === "en" ? category.nameEn : category.nameAr}
      </h3>

      {/* Description */}
      <p className="mt-2  text-sm text-start">
        {language === "en" ? category.descriptionEn : category.descriptionAr}
      </p>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          onClick={() => onEdit(category)}
          className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(category)}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
