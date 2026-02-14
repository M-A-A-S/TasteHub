import { useLanguage } from "../../hooks/useLanguage";

const TopItems = ({ items }) => {
  const { translations, language } = useLanguage();
  const { popular_dishes, orders } = translations.pages.dashboard_page;

  return (
    <div
      className="bg-white dark:bg-slate-800 p-6 rounded-xl border
     border-gray-100 dark:border-gray-700 shadow-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{popular_dishes}</h3>
      </div>
      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                {idx + 1}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {language == "en" ? item.nameEn : item.nameAr}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {item.ordersCount} {orders}
              </span>
              <div className="w-24 bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-400 h-full"
                  style={{
                    width: `${(item.ordersCount / (items[0]?.ordersCount || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopItems;
