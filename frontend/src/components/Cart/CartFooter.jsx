import { CreditCard, Loader2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { formatMoney, safeCall } from "../../utils/utils";
import Button from "../UI/Button";

const CartFooter = ({
  total = 0,
  actionLoading,
  onSubmit,
  onClearCart,
  cartItemsCount,
}) => {
  const handleSubmit = safeCall(onSubmit);
  const handleClearCart = safeCall(onClearCart);

  const { translations } = useLanguage();

  const { pay, charge, clear } = translations.pages.point_of_sale_page;

  return (
    <div>
      <div className="flex items-center justify-between gap-1 p-2 font-bold">
        <span>{pay}</span>
        <span className="text-orange-500 ">${formatMoney(total)}</span>
      </div>
      <Button
        disabled={actionLoading || cartItemsCount == 0}
        onClick={handleSubmit}
        className="w-full justify-center"
      >
        {actionLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <CreditCard /> {charge}
          </>
        )}
      </Button>
      {cartItemsCount > 0 && (
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
  );
};
export default CartFooter;
