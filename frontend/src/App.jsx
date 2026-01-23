import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import MenuCategoriesPage from "./pages/MenuCategoriesPage";
import Home from "./pages/Home";
import MenuItemsPage from "./pages/MenuItemsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu-categories" element={<MenuCategoriesPage />} />
            <Route path="/menu-items" element={<MenuItemsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
