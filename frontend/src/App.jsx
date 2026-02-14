import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import MenuCategoriesPage from "./pages/MenuCategoriesPage";
import Home from "./pages/Home";
import MenuItemsPage from "./pages/MenuItemsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ExtrasGroupsPage from "./pages/ExtrasGroupsPage";
import ExtrasPage from "./pages/ExtrasPage";
import ToastContainer from "./components/UI/ToastContainer";
import PointOfSalePage from "./pages/PointOfSalePage";
import SizePage from "./pages/SizePage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/point-of-sale" element={<PointOfSalePage />} />
            <Route path="/menu-categories" element={<MenuCategoriesPage />} />
            <Route path="/menu-items" element={<MenuItemsPage />} />
            <Route path="/extras-groups" element={<ExtrasGroupsPage />} />
            <Route path="/extras" element={<ExtrasPage />} />
            <Route path="/sizes" element={<SizePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
