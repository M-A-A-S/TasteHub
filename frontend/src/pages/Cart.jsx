import { useLanguage } from "../hooks/useLanguage";
import { safeCall } from "../utils/utils";
import CartHeader from "../components/Cart/CartHeader";
import CartEmpty from "../components/Cart/CartEmpty";
import CartItem from "../components/Cart/CartItem";
import CartFooter from "../components/Cart/CartFooter";

const Cart = ({
  tableNumber,
  cartItems,
  onQuantityChange,
  onClearCart,
  onSubmit,
  actionLoading,
}) => {
  const handleQuantityChange = safeCall(onQuantityChange);
  const handleClearCart = safeCall(onClearCart);
  const handleSubmit = safeCall(onSubmit);

  const { translations } = useLanguage();

  const { title } = translations.pages.point_of_sale_page;

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
      <CartHeader title={title} tableNumber={tableNumber} />
      <div className="flex-1 overflow-y-auto py-3">
        {cartItems?.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            {cartItems?.map((item) => (
              <CartItem item={item} onQuantityChange={handleQuantityChange} />
            ))}
          </>
        )}
      </div>
      <CartFooter
        total={total}
        onSubmit={handleSubmit}
        onClearCart={handleClearCart}
        cartItemsCount={cartItems.length}
        actionLoading={actionLoading}
      />
    </div>
  );
};
export default Cart;
