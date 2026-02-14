import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { formatMoney } from "../../utils/utils";

const Sales = ({ salesData }) => {
  const { translations, language } = useLanguage();
  const { theme } = useTheme();
  const { sales_velocity } = translations.pages.dashboard_page;

  return (
    <div
      className={`bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm lg:col-span-2 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {sales_velocity}
        </h3>
      </div>
      <div className="w-full h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {/* <AreaChart data={salesData}> */}
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#f97316"
                  stopOpacity={theme === "dark" ? 0.2 : 0.3}
                />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme === "dark" ? "#374151" : "#f3f4f6"}
            />
            <XAxis
              dataKey="time"
              reversed={language === "ar"}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: theme === "dark" ? "#d1d5db" : "#9ca3af",
                fontSize: 12,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatMoney}
              // width={language === "ar" ? 90 : 70}
              width={90}
              orientation={language === "ar" ? "right" : "left"}
              tick={{
                fill: theme === "dark" ? "#d1d5db" : "#9ca3af",
                fontSize: 12,
                dx: language === "ar" ? 70 : 0,
              }}
            />

            <Tooltip
              formatter={(value) => formatMoney(value)}
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
                borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
              }}
              labelStyle={{ color: theme === "dark" ? "#d1d5db" : "#111827" }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#colorSales)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Sales;
