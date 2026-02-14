import { useLanguage } from "../../../hooks/useLanguage";
import { formatMoney } from "../../../utils/utils";

const OrderItemRow = ({ item }) => {
  const { translations, language } = useLanguage();
  const { item: itemText, quantity } = translations.pages.orders_page;

  let itemName = "";
  let imageUrl = "";
  if (item?.menuItemSize?.menuItem) {
    itemName =
      language == "ar"
        ? item.menuItemSize.menuItem.nameAr
        : item.menuItemSize.menuItem.nameEn;

    imageUrl = item?.menuItemSize?.menuItem?.imageUrl;
  } else if (item?.menuItem) {
    itemName = language == "ar" ? item.menuItem.nameAr : item.menuItem.nameEn;
    imageUrl = item?.menuItem?.imageUrl;
  }

  const sizeName = item?.menuItemSize?.size
    ? language == "ar"
      ? item.menuItemSize.size.nameAr
      : item.menuItemSize.size.nameEn
    : "";

  return (
    <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-700 p-3 rounded-xl">
      <div className="flex items-center gap-3">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={itemName}
            className="w-12 h-12 object-cover rounded-lg"
          />
        )}

        <div>
          <p className="font-medium">
            {itemText}: {itemName} {sizeName && `(${sizeName})`}
          </p>

          <p className="text-sm text-gray-500">
            {quantity}: {item.quantity}
          </p>
        </div>
      </div>
      <p className="font-semibold">{formatMoney(item.lineTotal)}</p>
    </div>
  );
};
export default OrderItemRow;
