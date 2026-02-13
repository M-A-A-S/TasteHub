import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import Counter from "../Counter";

const CartItem = ({ item, onQuantityChange }) => {
  const { language } = useLanguage();
  const handleQuantityChange = safeCall(onQuantityChange);

  return (
    <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg mb-3 shadow-sm">
      <h5>
        {language == "en" ? item?.menuItem?.nameEn : item?.menuItem?.nameAr}
      </h5>
      <div className="flex items-center gap-1">
        {item?.menuItemSize && (
          <span
            className="text-xs text-white 
                bg-orange-400 p-1 rounded-md"
          >
            {language == "en"
              ? item?.menuItemSize?.size?.nameEn
              : item?.menuItemSize?.size?.nameAr}
          </span>
        )}
        {item?.extras?.map((extra) => (
          <span
            className="text-xs text-white 
                bg-orange-400 p-1 rounded-md"
          >
            {language == "en" ? extra?.nameEn : extra?.nameAr}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-black text-orange-600">
          $
          {(
            item.quantity *
            (Number(item.menuItem.price || 0) +
              Number(item.menuItemSize?.size?.priceModifier || 0) +
              (item.extras?.reduce(
                (acc, e) => acc + (Number(e.price) || 0),
                0,
              ) || 0))
          ).toFixed(2)}
        </span>
        <Counter
          value={item.quantity}
          onChange={(qty) =>
            handleQuantityChange(
              item.menuItem.id,
              item.menuItemSize?.id,
              item.extras?.map((e) => e.id),
              qty,
            )
          }
        />
      </div>
    </div>
  );
};
export default CartItem;
