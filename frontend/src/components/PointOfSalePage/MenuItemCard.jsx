import {
  Pencil,
  PencilRuler,
  SignalZero,
  SignalZeroIcon,
  Trash2,
} from "lucide-react";
import { formatMoney, safeCall } from "../../utils/utils";
import { useLanguage } from "../../hooks/useLanguage";

const MenuItemCard = ({ menuItem, onAddToCart }) => {
  const { language } = useLanguage();

  const handleAddToCart = safeCall(onAddToCart);

  return (
    <div
      className="max-w-sm rounded-2xl overflow-hidden 
    shadow-lg bg-white dark:bg-slate-800 
    border hover:shadow-xl transition cursor-pointer"
      onClick={() => handleAddToCart(menuItem)}
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={menuItem?.imageUrl}
          alt={language == "en" ? menuItem?.nameEn : menuItem?.nameAr}
          className="h-full w-full object-cover"
        />
        <span
          className="flex absolute top-2 right-2 
          text-orange-500 
        bg-white font-bold px-2 py-1 rounded-lg"
        >
          ${formatMoney(menuItem?.price)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-lg font-semibold">
          {language == "en" ? menuItem?.nameEn : menuItem?.nameAr}
        </h3>
        {menuItem?.menuCategory && (
          <p className="text-xs text-gray-500">
            {language === "en"
              ? menuItem.menuCategory.nameEn
              : menuItem.menuCategory.nameAr}
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
