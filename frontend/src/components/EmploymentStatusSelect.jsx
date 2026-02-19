import { useLanguage } from "../hooks/useLanguage";
import { EmploymentStatuses } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const EmploymentStatusSelect = ({ value, onChange, label, errorMessage }) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = EmploymentStatuses?.map((employmentStatus) => ({
    value: employmentStatus.value,
    label:
      translations?.employment_status?.[employmentStatus.key] ??
      employmentStatus.key,
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
export default EmploymentStatusSelect;
