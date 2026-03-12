import { useLanguage } from "../hooks/useLanguage";
import { PaymentMethods } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const PaymentMethodSelect = ({
  value,
  onChange,
  label,
  errorMessage,
  className,
}) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = PaymentMethods?.map((method) => ({
    value: method.value,
    label: translations?.payment_methods?.[method.key] ?? method.key,
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
export default PaymentMethodSelect;
