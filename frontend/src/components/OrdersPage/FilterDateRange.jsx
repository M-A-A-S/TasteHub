import { safeCall } from "../../utils/utils";
import Input from "../UI/Input";

const FilterDateRange = ({
  fromLabel,
  toLabel,
  from,
  to,
  onChangeFrom,
  onChangeTo,
}) => {
  const handleFromChange = safeCall(onChangeFrom);
  const handleToChange = safeCall(onChangeTo);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Input
        className="flex items-center gap-2"
        label={fromLabel}
        name="from"
        type="date"
        value={from}
        showLabel={true}
        onChange={handleFromChange}
      />
      <Input
        className="flex items-center gap-2"
        label={toLabel}
        name="to"
        type="date"
        value={to}
        showLabel={true}
        onChange={handleToChange}
      />
    </div>
  );
};
export default FilterDateRange;
