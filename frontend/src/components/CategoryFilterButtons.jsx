import { useEffect, useState } from "react";
import { read } from "../api/apiWrapper";
import { useLanguage } from "../hooks/useLanguage";
import { safeCall } from "../utils/utils";

const CategoryFilterButtons = ({
  value,
  onChange,
  disabled = false,
  includeAll = true,
}) => {
  const [categories, setCategories] = useState([]);
  const { language } = useLanguage();

  const hanldeChange = safeCall(onChange);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await read("menu-categories");

        const options = result?.data.map((cat) => ({
          id: cat.id,
          label: language === "en" ? cat.nameEn : cat.nameAr,
        }));

        setCategories(options);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [language]);

  return (
    <div className="flex flex-wrap gap-2 m-2">
      {includeAll && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => hanldeChange(null)}
          className={`px-4 py-2 rounded-full border transition
            ${
              value === null
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white dark:bg-slate-800  border-gray-300 dark:border-slate-600 hover:bg-gray-100"
            }`}
        >
          {language === "en" ? "All" : "الكل"}
        </button>
      )}

      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          disabled={disabled}
          onClick={() => hanldeChange(cat.id)}
          className={`px-4 py-2 rounded-full border transition
            ${
              value === cat.id
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilterButtons;
