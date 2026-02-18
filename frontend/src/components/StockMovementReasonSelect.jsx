import { useLanguage } from "../hooks/useLanguage";
import { StockMovementReasons } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const StockMovementReasonSelect = ({
  value,
  onChange,
  label,
  errorMessage,
}) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = StockMovementReasons?.map((reason) => ({
    value: reason.value,
    label: translations?.stock_movement_reasons?.[reason.key] ?? reason.key,
  }));

  return (
    <Select
      options={options}
      label={label}
      showLabel={true}
      value={value}
      onChange={handleChange}
      errorMessage={errorMessage}
    />
  );
};
export default StockMovementReasonSelect;
