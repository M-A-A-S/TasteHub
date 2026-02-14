import OrderCardHeader from "./OrderCard/OrderCardHeader";
import OrderItemsList from "./OrderCard/OrderItemsList";
import OrderSummary from "./OrderCard/OrderSummary";
import OrderCardFooter from "./OrderCard/OrderCardFooter";
import OrderCardAction from "./OrderCard/OrderCardAction";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 w-full max-w-2xl border">
      <OrderCardHeader order={order} />
      <OrderItemsList orderItems={order?.orderItems} />
      <OrderSummary order={order} />
      <OrderCardFooter order={order} />
      <OrderCardAction order={order} />
    </div>
  );
};

export default OrderCard;
