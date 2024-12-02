import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, PieChart } from "lucide-react"; 

const AdminMenu: React.FC = () => {
  const menuItems = [
    { to: "/dashboard/admin", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/dashboard/admin/users", label: "Users", icon: <Users size={18} /> },
    {
      to: "/dashboard/admin/reports",
      label: "Reports",
      icon: <PieChart size={18} />,
    },
  ];

  return (
    <div className="h-full bg-white text-gray-900 w-64 border-r border-gray-300">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-xl font-bold text-center">Admin Panel</h2>
      </div>
      <ul className="space-y-1 mt-4">
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-gray-200 text-blue-600"
                    : "hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;