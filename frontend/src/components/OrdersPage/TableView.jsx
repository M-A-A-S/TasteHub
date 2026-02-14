import { useLanguage } from "../../hooks/useLanguage";
import { formatDateTime, formatMoney } from "../../utils/utils";
import OrderTypeBadge from "./OrderCard/OrderTypeBadge";
import OrderItemCell from "./OrderItemCell";
import Table from "../UI/Table";
import OrderStatusBadge from "./OrderCard/OrderStatusBadge";
import { printBill } from "../../utils/printBill";
import { Printer } from "lucide-react";

const TableView = ({ orders }) => {
  const { translations } = useLanguage();

  const {
    table_headers: {
      orderNumber,
      orderDate,
      type,
      status,
      total,
      items,
      actions,
    },
  } = translations.pages.orders_page;

  const data = orders?.map((order) => ({
    orderNumber: <small>{order?.id}</small>,
    orderDate: <small>{formatDateTime(order?.orderDateTime)}</small>,
    type: <OrderTypeBadge type={order?.orderType} />,
    status: <OrderStatusBadge status={order?.orderStatus} />,
    total: <small>{formatMoney(order.grandTotal)}</small>,
    items: (
      <div>
        {order?.orderItems?.map((item) => (
          <OrderItemCell key={item.id} item={item} />
        ))}
      </div>
    ),
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => printBill(order)}
          aria-label="Edit menu item"
          className="text-gray-500 p-2 rounded-lg 
          hover:text-orange-500 transition "
        >
          <Printer size={18} />
        </button>
      </div>
    ),
  }));

  return (
    <Table
      headers={[orderNumber, orderDate, type, status, total, items, actions]}
      data={data}
    />
  );
};
export default TableView;
