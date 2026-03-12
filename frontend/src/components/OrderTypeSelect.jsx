import { useLanguage } from "../hooks/useLanguage";
import { OrderType, OrderTypes } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const OrderTypeSelect = ({
  value,
  onChange,
  label,
  errorMessage,
  className,
}) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = OrderTypes?.map((orderType) => ({
    value: orderType.value,
    label: translations?.order_types?.[orderType.key] ?? OrderType.DINE_IN,
  }));

  return (
    <Select
      options={options}
      label={label}
      showLabel={true}
      value={value}
      onChange={handleChange}
      errorMessage={errorMessage}
      className={className}
    />
  );
};
export default OrderTypeSelect;
