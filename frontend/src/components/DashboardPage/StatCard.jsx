import { useLanguage } from "../../hooks/useLanguage";
import { formatMoney } from "../../utils/utils";

const StatCard = ({ stat }) => {
  const { translations } = useLanguage();

  return (
    <div
      className="bg-white dark:bg-slate-800 p-6 
    rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md"
    >
      <p className="text-sm font-medium text-gray-500">
        {translations.pages.dashboard_page?.[stat.key] ?? ""}
      </p>
      <div className="flex items-end justify-between mt-2 text-orange-600">
        <h3 className="text-2xl font-bold">
          {stat.key == "today_sales" ? formatMoney(stat.value) : stat.value}
        </h3>
      </div>
    </div>
  );
};
export default StatCard;
