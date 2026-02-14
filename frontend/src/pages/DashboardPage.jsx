import { useEffect, useState } from "react";
import { read } from "../api/apiWrapper";
import PageHeader from "../components/PageHeader";
import Stats from "../components/DashboardPage/Stats";
import Sales from "../components/DashboardPage/Sales";
import TopItems from "../components/DashboardPage/TopItems";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { useLanguage } from "../hooks/useLanguage";
import { formatMoney } from "../utils/utils";

const DashboardPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const { translations } = useLanguage();
  const { title, description } = translations.pages.dashboard_page;

  const { loading_error, empty_state } = translations.common;

  const fetchDashboardData = async () => {
    let result;
    try {
      setLoading(true);
      const result = await read("dashboard");
      setSalesData(result.data.sales || []);
      setTopItems(result.data.topItems || []);
      setStats(result.data.stats || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <PageHeader title={title} description={description} />

      {loading ? (
        <div className="grid place-items-center h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : errorCode ? (
        <div className="grid place-items-center h-[60vh] text-red-500">
          {translations.server_codes[errorCode] || loading_error}
        </div>
      ) : salesData?.length === 0 &&
        topItems.length == 0 &&
        stats.length == 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <Stats stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-2">
            <Sales salesData={salesData} />
            <TopItems items={topItems} />
          </div>
        </>
      )}
    </div>
  );
};
export default DashboardPage;
