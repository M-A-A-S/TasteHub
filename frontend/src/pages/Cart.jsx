import { ClipboardList, CreditCard, ShoppingBag } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { safeCall } from "../utils/utils";
import Button from "../components/ui/Button";
import Counter from "../components/Counter";

const Cart = ({
  tableNumber,
  cartItems,
  onQuantityChange,
  onClearCart,
  onSubmit,
}) => {
  const handleQuantityChange = safeCall(onQuantityChange);
  const handleClearCart = safeCall(onClearCart);
  const handleSubmit = safeCall(onSubmit);

  const { language, translations } = useLanguage();

  const { title, empty, charge, clear, pay } =
    translations.pages.point_of_sale_page;

  const total = cartItems?.reduce((sum, item) => {
    const basePrice = Number(item.menuItem.price || 0);
    const sizeModifier = Number(item.menuItemSize?.size?.priceModifier || 0);
    const extrasTotal =
      item.extras?.reduce((acc, e) => acc + (Number(e.price) || 0), 0) || 0;

    return sum + item.quantity * (basePrice + sizeModifier + extrasTotal);
  }, 0);

  return (
    <div
      className="
    w-full
    lg:w-[380px]
    flex flex-col justify-between
    bg-white dark:bg-slate-800
    rounded-lg shadow-lg p-3
    lg:sticky lg:top-14
    max-h-[70vh]
  "
    >
      <div
        className="flex items-center justify-between gap-1 py-2
        font-medium"
      >
        <h3>
          {title} <span className="text-orange-500">. T{tableNumber}</span>
        </h3>
        <ShoppingBag />
      </div>
      <div className="flex-1 overflow-y-auto py-3">
        {cartItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            <ClipboardList size={36} />
            <span>{empty}</span>
          </div>
        ) : (
          <>
            {cartItems?.map((item) => (
              <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg mb-3 shadow-sm">
                <h5>
                  {language == "en"
                    ? item?.menuItem?.nameEn
                    : item?.menuItem?.nameAr}
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
            ))}
          </>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between gap-1 p-2 font-bold">
          <span>{pay}</span>
          <span className="text-orange-500 ">${total.toFixed(2)}</span>
        </div>
        <Button
          disabled={tableNumber <= 0}
          onClick={handleSubmit}
          className="w-full justify-center"
        >
          <CreditCard /> {charge}
        </Button>
        {cartItems?.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleClearCart}
              className="text-grey-500 hover:text-red-500 my-1 
        transition "
            >
              {clear}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
