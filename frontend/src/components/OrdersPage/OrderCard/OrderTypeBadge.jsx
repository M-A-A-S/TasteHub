import { useLanguage } from "../../../hooks/useLanguage";
import { ORDER_TYPES, TYPE_STYLES } from "../../../utils/orderHelpers";

const OrderTypeBadge = ({ type }) => {
  const { translations } = useLanguage();

  const typeKey = ORDER_TYPES?.[type];
  const typeStyle = TYPE_STYLES?.[typeKey] ?? "bg-gray-100 text-gray-600";
  const typeText = translations?.pages?.orders_page?.type ?? "Type";
  const translatedType =
    translations?.pages?.orders_page?.types?.[typeKey] ?? typeKey ?? type;

  return (
    <span
      className={`
    px-3 py-1 text-sm rounded-full
    ${typeStyle}`}
    >
      {typeText}: {translatedType}
    </span>
  );
};
export default OrderTypeBadge;
