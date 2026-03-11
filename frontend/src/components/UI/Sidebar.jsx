import {
  ChartColumn,
  ChefHat,
  LayoutDashboard,
  MenuIcon,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  UtensilsCrossed,
  X,
  PencilRuler,
  Truck,
  Users,
  User,
  Calendar,
  Clock,
  FileText,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import SidebarHeader from "../Sidebar/SidebarHeader";
import SidebarNav from "../Sidebar/SidebarNav";
import { useAuth } from "../../hooks/useAuth";

// analytics: "Analytics";
// categories: "Categories Management";
// dashboard: "Dashboard";
// menu: "Menu Management";
// orders: "Orders";
// settings: "Settings";

// const menus = {
//   admin: [
//     {
//       key: "dashboard",
//       path: "/",
//       icon: <LayoutDashboard />,
//     },
//     {
//       key: "point_of_sale",
//       path: "/point-of-sale",
//       icon: <UtensilsCrossed />,
//     },
//     {
//       key: "categories",
//       path: "/menu-categories",
//       icon: <ChefHat />,
//     },
//     {
//       key: "menu",
//       path: "/menu-items",
//       icon: <ChefHat />,
//     },
//     {
//       key: "extras_groups",
//       path: "/extras-groups",
//       icon: <ChefHat />,
//     },
//     {
//       key: "extras",
//       path: "/extras",
//       icon: <ChefHat />,
//     },
//     {
//       key: "sizes",
//       path: "/sizes",
//       icon: <PencilRuler />,
//     },
//     {
//       key: "orders",
//       path: "/orders",
//       icon: <Package />,
//     },

//     {
//       key: "analytics",
//       path: "/analytics",
//       icon: <ChartColumn />,
//     },
//     {
//       key: "settings",
//       path: "/settings",
//       icon: <Package />,
//     },
//   ],
// };

// const menus = {
//   admin: [
//     {
//       key: "dashboard",
//       path: "/",
//       icon: <LayoutDashboard />,
//     },

//     {
//       key: "point_of_sale",
//       path: "/point-of-sale",
//       icon: <UtensilsCrossed />,
//     },

//     {
//       key: "orders",
//       path: "/orders",
//       icon: <Package />,
//     },

//     {
//       key: "analytics",
//       path: "/analytics",
//       icon: <ChartColumn />,
//     },

//     {
//       key: "menu_management",
//       icon: <ChefHat />,
//       children: [
//         {
//           key: "categories",
//           path: "/menu-categories",
//           icon: <ChefHat />,
//         },
//         {
//           key: "menu_items",
//           path: "/menu-items",
//           icon: <ChefHat />,
//         },
//         {
//           key: "extras_groups",
//           path: "/extras-groups",
//           icon: <ChefHat />,
//         },
//         {
//           key: "extras",
//           path: "/extras",
//           icon: <ChefHat />,
//         },
//         {
//           key: "sizes",
//           path: "/sizes",
//           icon: <PencilRuler />,
//         },
//       ],
//     },

//     {
//       key: "inventory_management",
//       icon: <Package />,
//       children: [
//         {
//           key: "suppliers",
//           path: "/suppliers",
//           icon: <Truck />,
//         },
//         {
//           key: "ingredients",
//           path: "/ingredients",
//           icon: <Package />,
//         },
//         {
//           key: "inventory_transactions",
//           path: "/inventory-transactions",
//           icon: <Package />,
//         },
//         {
//           key: "inventory_batches",
//           path: "/inventory-batches",
//           icon: <Package />,
//         },
//       ],
//     },

//     {
//       key: "hr_management",
//       icon: <Users />,
//       children: [
//         { key: "employees", path: "/hr/employees", icon: <User /> },
//         {
//           key: "shift_types",
//           path: "/hr/shift-types",
//           icon: <Calendar />,
//         },
//         {
//           key: "leave_types",
//           path: "/hr/leave-types",
//           icon: <FileText />,
//         },
//         {
//           key: "work_schedules",
//           path: "/hr/work-schedules",
//           icon: <Calendar />,
//         },
//         { key: "attendances", path: "/hr/attendances", icon: <Clock /> },
//         // { key: "leaves", path: "/hr/leaves", icon: <FileText /> },
//         {
//           key: "leave_requests",
//           path: "/hr/leave-requests",
//           icon: <FileText />,
//         },
//         {
//           key: "leave_approvals",
//           path: "/hr/leave-approvals",
//           icon: <FileText />,
//         },
//         { key: "payroll", path: "/hr/payroll", icon: <DollarSign /> },
//       ],
//     },
//   ],
// };

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

const menus = [
  {
    key: "dashboard",
    path: "/",
    icon: <LayoutDashboard />,
    roles: ["administrator", "manager"],
  },

  {
    key: "point_of_sale",
    path: "/point-of-sale",
    icon: <UtensilsCrossed />,
    roles: ["administrator", "manager", "cashier"],
  },

  {
    key: "orders",
    path: "/orders",
    icon: <Package />,
    roles: ["administrator", "manager"],
  },

  // {
  //   key: "analytics",
  //   path: "/analytics",
  //   icon: <ChartColumn />,
  //   roles: ["administrator"],
  // },

  {
    key: "menu_management",
    icon: <ChefHat />,
    roles: ["administrator", "manager"],
    children: [
      {
        key: "categories",
        path: "/menu-categories",
        icon: <ChefHat />,
        roles: ["administrator", "manager"],
      },
      {
        key: "menu_items",
        path: "/menu-items",
        icon: <ChefHat />,
        roles: ["administrator", "manager"],
      },
      {
        key: "extras_groups",
        path: "/extras-groups",
        icon: <ChefHat />,
        roles: ["administrator", "manager"],
      },
      {
        key: "extras",
        path: "/extras",
        icon: <ChefHat />,
        roles: ["administrator", "manager"],
      },
      {
        key: "sizes",
        path: "/sizes",
        icon: <PencilRuler />,
        roles: ["administrator", "manager"],
      },
    ],
  },

  {
    key: "inventory_management",
    icon: <Package />,
    roles: ["administrator", "manager"],
    children: [
      {
        key: "suppliers",
        path: "/suppliers",
        icon: <Truck />,
        roles: ["administrator", "manager"],
      },
      {
        key: "ingredients",
        path: "/ingredients",
        icon: <Package />,
        roles: ["administrator", "manager"],
      },
      {
        key: "inventory_transactions",
        path: "/inventory-transactions",
        icon: <Package />,
        roles: ["administrator", "manager"],
      },
      {
        key: "inventory_batches",
        path: "/inventory-batches",
        icon: <Package />,
        roles: ["administrator", "manager"],
      },
    ],
  },

  {
    key: "hr_management",
    icon: <Users />,
    roles: ["administrator", "manager", "hr"],
    children: [
      {
        key: "employees",
        path: "/hr/employees",
        icon: <User />,
        roles: ["administrator", "manager", "hr"],
      },
      {
        key: "shift_types",
        path: "/hr/shift-types",
        icon: <Calendar />,
        roles: ["administrator", "manager", "hr"],
      },
      {
        key: "leave_types",
        path: "/hr/leave-types",
        icon: <FileText />,
        roles: ["administrator", "manager", "hr"],
      },
      {
        key: "work_schedules",
        path: "/hr/work-schedules",
        icon: <Calendar />,
        roles: ["administrator", "manager", "hr"],
      },
      {
        key: "attendances",
        path: "/hr/attendances",
        icon: <Clock />,
        roles: ["administrator", "manager", "hr"],
      },

      // { key: "leaves", path: "/hr/leaves", icon: <FileText /> },
      {
        key: "leave_requests",
        path: "/hr/leave-requests",
        icon: <FileText />,
        roles: ["administrator", "manager", "hr"],
      },
      {
        key: "leave_approvals",
        path: "/hr/leave-approvals",
        icon: <FileText />,
        roles: ["administrator", "manager", "hr"],
      },
      {
        key: "payroll",
        path: "/hr/payroll",
        icon: <DollarSign />,
        roles: ["administrator", "manager", "hr"],
      },
    ],
  },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();
  const { currentRole, userRoles } = useAuth();

  // const filterLinksByRole = (links, role) => {
  //   return links
  //     .filter((menu) => !menu.roles || menu.roles.includes(role))
  //     .map((menu) => {
  //       if (!menu.children) {
  //         return menu;
  //       }

  //       const children = menu.children.filter(
  //         (child) => !child.roles || child.roles.includes(role),
  //       );

  //       return { ...menu, children };
  //     })
  //     .filter((menu) => !menu.children || menu.children.length > 0);
  // };

  const filterLinksByRole = (links, roles) => {
    return links
      .filter(
        (menu) =>
          !menu.roles || menu.roles.some((role) => roles.includes(role)),
      )
      .map((menu) => {
        if (!menu.children) {
          return menu;
        }

        const children = menu.children.filter(
          (child) =>
            !child.roles || child.roles.some((role) => roles.includes(role)),
        );

        return { ...menu, children };
      })
      .filter((menu) => !menu.children || menu.children.length > 0);
  };

  // const links = filterLinksByRole(menus, currentRole);
  const links = filterLinksByRole(menus, userRoles);

  return (
    <aside
      className={`bg-white dark:bg-slate-800 shadow-lg  transition-all duration-300 
        fixed z-20 top-0  ${language == "en" ? "left-0" : "right-0"}  
        h-screen flex flex-col  ${sidebarOpen ? "w-64" : "w-20"} `}
    >
      {/* Top */}
      <SidebarHeader
        sidebarOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />
      {/* Links */}
      <SidebarNav sidebarOpen={sidebarOpen} links={links} />
      {/* Bottom */}
      {/* <div className="bg-green-300 p-10">Bottom</div> */}
    </aside>
  );
};
export default Sidebar;
