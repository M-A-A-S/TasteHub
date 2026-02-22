import { useLanguage } from "../hooks/useLanguage";
import { DaysOfWeek } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const DayOfWeekSelect = ({ value, onChange, label, errorMessage }) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = DaysOfWeek?.map((day) => ({
    value: day.value,
    label: translations?.pages?.work_schedules_page?.days?.[day.key] ?? day.key,
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
export default DayOfWeekSelect;
