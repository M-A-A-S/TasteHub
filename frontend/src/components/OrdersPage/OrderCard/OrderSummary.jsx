import { useLanguage } from "../../../hooks/useLanguage";
import { formatMoney } from "../../../utils/utils";

const OrderSummary = ({ order }) => {
  const { translations } = useLanguage();
  const { subtotal, tax, discount, total } = translations.pages.orders_page;

  return (
    <div className="border-t pt-4 space-y-1 text-sm">
      <div className="flex justify-between">
        <span>{subtotal}</span>
        <span>{formatMoney(order.subtotalAmount)}</span>
      </div>

      <div className="flex justify-between">
        <span>{tax}</span>
        <span>{formatMoney(order.taxAmount)}</span>
      </div>

      <div className="flex justify-between">
        <span>{discount}</span>
        <span>{formatMoney(order.discountAmount)}</span>
      </div>

      <div
        className="flex justify-between font-bold text-base pt-2 
      text-orange-600"
      >
        <span>{total}</span>
        <span>{formatMoney(order.grandTotal)}</span>
      </div>
    </div>
  );
};
export default OrderSummary;
