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
import IngredientsPage from "./pages/IngredientsPage";
import SuppliersPage from "./pages/SuppliersPage";
import InventoryTransactionsPage from "./pages/inventoryTransactionsPage";
import IngredientBatchesPage from "./pages/IngredientBatchesPage";
import EmployeesPage from "./pages/EmployeesPage";
import ShiftTypesPage from "./pages/ShiftTypesPage";
import LeaveTypesPage from "./pages/LeaveTypesPage";
import WorkSchedulesPage from "./pages/WorkSchedulesPage";
import AttendancePage from "./pages/AttendancePage";
import LeaveRequestsPage from "./pages/LeaveRequestsPage";
import LeaveApprovalsPage from "./pages/LeaveApprovalsPage";

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
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route
              path="/inventory-transactions"
              element={<InventoryTransactionsPage />}
            />
            <Route
              path="/inventory-batches"
              element={<IngredientBatchesPage />}
            />
            <Route path="/hr/employees" element={<EmployeesPage />} />
            <Route path="/hr/shift-types" element={<ShiftTypesPage />} />
            <Route path="/hr/leave-types" element={<LeaveTypesPage />} />
            <Route path="/hr/work-schedules" element={<WorkSchedulesPage />} />
            <Route path="/hr/attendances" element={<AttendancePage />} />
            <Route path="/hr/leave-requests" element={<LeaveRequestsPage />} />
            <Route
              path="/hr/leave-approvals"
              element={<LeaveApprovalsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
