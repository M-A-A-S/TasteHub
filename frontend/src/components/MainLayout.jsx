import { Outlet } from "react-router-dom";
import Sidebar from "./UI/Sidebar";
import Navbar from "./UI/Navbar";
import { useLanguage } from "../hooks/useLanguage";

const MainLayout = () => {
  const { language } = useLanguage();
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main
        className={`mt-5 p-5 min-h-screen text-start ${language == "en" ? "pl-16" : "pr-16"}`}
      >
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
