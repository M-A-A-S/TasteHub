import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";
import Select from "./UI/Select";

const LeaveTypeSelect = ({
  value,
  onChange,
  required = false,
  disabled = false,
  errorMessage = "",
  showLabel = false,
  label,
  name,
}) => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { language } = useLanguage();

  const loadingOptions = [
    {
      value: "",
      label: language === "en" ? "Loading..." : "جاري التحميل...",
    },
  ];
  const fetchLeaveTypes = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const result = await read("leave-types");
      const options = result?.data.map((cat) => ({
        value: cat.id,
        label: language === "en" ? cat.nameEn : cat.nameAr,
      }));
      setLeaveTypes(options);
      console.log("options", options);
    } catch (error) {
      setIsError(true);
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  if (isError) {
    return (
      <div className="flex flex-col gap-1">
        {(showLabel || label) && (
          <label className="text-sm font-medium text-gray-700">
            {label || (language === "en" ? "Category" : "التصنيف")}
          </label>
        )}

        <div className="flex items-center gap-3 p-2 border border-red-300 rounded bg-red-50">
          <span className="text-sm text-red-600">
            {language === "en" ? "Failed to load data." : "فشل التحميل."}
          </span>
          <button
            type="button"
            onClick={fetchLeaveTypes}
            className="text-xs underline text-red-700 hover:text-red-900 font-bold"
          >
            {language === "en" ? "Retry" : "إعادة المحاولة"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Select
      options={loading ? loadingOptions : leaveTypes}
      label={label}
      value={value || ""}
      onChange={onChange}
      required={required}
      disabled={disabled || loading}
      showLabel={showLabel}
      name={name}
      errorMessage={errorMessage}
    />
  );
};
export default LeaveTypeSelect;
