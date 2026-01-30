import {
  Pencil,
  PencilRuler,
  SignalZero,
  SignalZeroIcon,
  Trash2,
} from "lucide-react";
import { safeCall } from "../../utils/utils";
import { useLanguage } from "../../hooks/useLanguage";

const MenuItemCard = ({
  menuItem,
  handleEditMenuItem,
  handleDeleteMenuItem,
  handleMenuItemSizes,
}) => {
  console.log("item -> ", menuItem);

  const { language, translations } = useLanguage();

  const { active, inactive, created_label, updated_label, id_label } =
    translations.pages.menu_page;

  const onEdit = safeCall(handleEditMenuItem);
  const onDelete = safeCall(handleDeleteMenuItem);
  const hanldeSizes = safeCall(handleMenuItemSizes);

  return (
    <div
      className="max-w-sm rounded-2xl overflow-hidden 
    shadow-lg bg-white dark:bg-slate-800 
    border hover:shadow-xl transition"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={menuItem?.imageUrl}
          alt={language == "en" ? menuItem?.nameEn : menuItem?.nameAr}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {language == "en" ? menuItem?.nameEn : menuItem?.nameAr}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              menuItem?.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {menuItem?.isActive ? active : inactive}
          </span>
        </div>

        {/* Category */}
        {menuItem?.menuCategory && (
          <p className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 w-fit">
            {language === "en"
              ? menuItem.menuCategory.nameEn
              : menuItem.menuCategory.nameAr}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {language == "en" ? menuItem?.descriptionEn : menuItem?.descriptionAr}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-orange-600">
            ${Number(menuItem?.price ?? 0).toFixed(2)}
          </span>
          <span className="text-xs text-gray-400">
            {id_label}: {menuItem?.id}
          </span>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-400 pt-1">
          {menuItem?.createdAt && (
            <p>
              {created_label}:{" "}
              {new Date(menuItem.createdAt).toLocaleDateString()}
            </p>
          )}
          {menuItem?.updatedAt && (
            <p>
              {updated_label}:{" "}
              {new Date(menuItem.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={() => onEdit(menuItem)}
            aria-label="Edit menu item"
            className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(menuItem)}
            aria-label="Delete menu item"
            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => hanldeSizes(menuItem)}
            className="text-gray-500 p-2 rounded-lg 
          hover:text-orange-500 transition "
          >
            <PencilRuler size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
