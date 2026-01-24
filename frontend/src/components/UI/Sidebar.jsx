import {
  ChartColumn,
  ChefHat,
  Heart,
  House,
  LayoutDashboard,
  MenuIcon,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";

// analytics: "Analytics";
// categories: "Categories Management";
// dashboard: "Dashboard";
// menu: "Menu Management";
// orders: "Orders";
// settings: "Settings";

const menus = {
  admin: [
    {
      key: "dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      key: "categories",
      path: "/menu-categories",
      icon: <ChefHat />,
    },
    {
      key: "menu",
      path: "/menu-items",
      icon: <ChefHat />,
    },
    {
      key: "orders",
      path: "/orders",
      icon: <Package />,
    },
    {
      key: "analytics",
      path: "/analytics",
      icon: <ChartColumn />,
    },
    {
      key: "settings",
      path: "/settings",
      icon: <Package />,
    },
  ],
};

// const menus = {
// unknown_user: [
//   { key: "shop_now", path: "/", icon: <House /> },
//   { key: "cart", path: "/cart", icon: <ShoppingCart /> },
//   { key: "favorites", path: "/favorites", icon: <Heart /> },
// ],
// customer: [
//   {
//     key: "dashboard",
//     path: "/customer-dashboard",
//     icon: <LayoutDashboard />,
//   },
//   { key: "shop_now", path: "/", icon: <House /> },
//   { key: "Menu Categoryis", path: "/menu-categories", icon: <Heart /> },
//   { key: "Menu Categoryis", path: "/menu-items", icon: <Heart /> },
// { key: "cart", path: "/me", icon: <ShoppingCart /> },
// { key: "orders", path: "/customer-orders", icon: <ShoppingBag /> },
// ],
// seller: [
//   { key: "dashboard", path: "/seller-dashboard", icon: <LayoutDashboard /> },
//   { key: "products", path: "/seller-products", icon: <Package /> },
//   // { key: "add_product", path: "/add-product", icon: <Package /> },
//   { key: "orders", path: "/seller-orders", icon: <ShoppingBag /> },
// ],
// admin: [
//   { key: "dashboard", path: "/admin-dashboard", icon: <LayoutDashboard /> },
//   { key: "users", path: "/users", icon: <User /> },
//   { key: "categories", path: "/product-categories", icon: <Layers /> },
//   { key: "brands", path: "/brands", icon: <Tags /> },
//   { key: "products", path: "/products", icon: <Package /> },
// ],
// superadmin: [
//   {
//     key: "dashboard",
//     path: "/superadmin-dashboard",
//     icon: <LayoutDashboard />,
//   },
//   { key: "users", path: "/users", icon: <User /> },
//   { key: "categories", path: "/categories", icon: <Layers /> },
// ],
// };

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language, translations } = useLanguage();

  console.log("translations -> ", translations);
  console.log("language -> ", language);

  let links = menus.admin;

  return (
    <aside
      className={`bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 
        fixed top-0 ${language == "en" ? "left-0" : "right-0"}  
        min-h-screen flex flex-col  ${sidebarOpen ? "w-64" : "w-20"} `}
    >
      {/* Top */}
      <div className="flex items-center justify-between gap-1 p-4 border-b h-16">
        {sidebarOpen && (
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <h3 className="text-xl font-bold">Bistro Manager</h3>
          </div>
        )}
        {!sidebarOpen && (
          <ChefHat className="h-8 w-8 text-orange-600 mx-auto" />
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>
      {/* Links */}
      <nav className="mt-6 px-2 flex-1">
        <ul>
          {links.map((link) => (
            <li key={link.key}>
              <NavLink
                onClick={() => setSidebarOpen(false)}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center w-full p-3 rounded-lg mb-2 
                transition-colors 
                transition-all duration-300 
                hover:bg-orange-100 dark:hover:text-gray-950
                ${isActive ? "bg-orange-100 text-orange-700" : ""}`
                }
              >
                <span className="icon">{link.icon}</span>
                {sidebarOpen && (
                  <span
                    className={`${language == "en" ? "ml-3" : "mr-3"} font-medium`}
                  >
                    {translations.sidebar[link.key]}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Bottom */}
      <div className="bg-green-300">{/* Bottom */}</div>
    </aside>
  );
};
export default Sidebar;
