import { useLanguage } from "../hooks/useLanguage";
import { TableStatuses } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const TableStatusSelect = ({ value, onChange, label, errorMessage }) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = TableStatuses?.map((status) => ({
    value: status.value,
    label: translations?.table_statuses?.[status.key] ?? status.key,
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
export default TableStatusSelect;
