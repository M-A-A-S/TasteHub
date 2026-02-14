import { X } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

const OrderItemCell = ({ item }) => {
  const { language } = useLanguage();

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
    <div className="flex flex-wrap my-1 items-center gap-2 text-sm">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={itemName}
          className="w-8 h-8 object-cover rounded-lg"
        />
      )}
      {itemName} {sizeName && `(${sizeName})`} X {item.quantity}
    </div>
  );
};
export default OrderItemCell;
