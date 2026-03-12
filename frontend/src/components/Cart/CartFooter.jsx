import { CreditCard, Loader2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { formatMoney, safeCall } from "../../utils/utils";
import Button from "../UI/Button";
import OrderTypeSelect from "../OrderTypeSelect";
import PaymentMethodSelect from "../PaymentMethodSelect";
import Input from "../UI/Input";

const CartFooter = ({
  total = 0,
  actionLoading,
  onSubmit,
  onClearCart,
  cartItemsCount,
  orderType,
  setOrderType,
  paymentMethod,
  setPaymentMethod,
  transactionReference,
  setTransactionReference,
}) => {
  const handleSubmit = safeCall(onSubmit);
  const handleClearCart = safeCall(onClearCart);

  const { translations } = useLanguage();

  const { pay, charge, clear, order_type, payment_method, reference_number } =
    translations.pages.point_of_sale_page;

  return (
    <div>
      {cartItemsCount > 0 && (
        <div className="my-3">
          <OrderTypeSelect
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            label={order_type}
            className="mb-2 w-[240px]"
          />

          <div className="flex items-center gap-3 flex-wrap">
            <PaymentMethodSelect
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              label={payment_method}
            />
            <Input
              label={reference_number}
              placeholder={reference_number}
              value={transactionReference}
              onChange={(e) => setTransactionReference(e.target.value)}
              showLabel={true}
            />
          </div>
        </div>
      )}

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
