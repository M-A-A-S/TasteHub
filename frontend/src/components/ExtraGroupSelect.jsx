import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";
import Select from "./UI/Select";

const ExtraGroupSelect = ({
  value,
  onChange,
  required = false,
  disabled = false,
  errorMessage = "",
  showLabel = false,
  label,
  name,
}) => {
  const [extraGroups, setExtraGroups] = useState([]);
  const { language } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadingOptions = [
    { value: "", label: language === "en" ? "Loading..." : "جاري التحميل..." },
  ];
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setIsError(false);

      const result = await read("extras-groups");
      const options = result?.data.map((cat) => ({
        value: cat.id,
        label: language === "en" ? cat.nameEn : cat.nameAr,
      }));

      setExtraGroups(options);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
            onClick={fetchCategories}
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
      options={loading ? loadingOptions : extraGroups}
      disabled={loading || disabled}
      label={label ? label : language === "en" ? "Category" : "التصنيف"}
      value={value || "Dummy_Value_To_Force_Select_Update"}
      onChange={onChange}
      required={required}
      showLabel={showLabel}
      name={name}
      errorMessage={errorMessage}
    />
  );
};

export default ExtraGroupSelect;
