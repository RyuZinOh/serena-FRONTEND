import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, PieChart, Menu as MenuIcon, PlusSquare } from "lucide-react";

const AdminMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { to: "/dashboard/admin", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/dashboard/admin/users", label: "Users", icon: <Users size={18} /> },
    {
      to: "/dashboard/admin/reports",
      label: "Reports",
      icon: <PieChart size={18} />,
    },
    {
      to: "/dashboard/admin/custompoke",
      label: "Custom Poke", 
      icon: <PlusSquare size={18} />, 
    },
  ];

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Mobile Hamburger Icon */}
      <button
        ref={menuButtonRef}
        className="block md:hidden p-4 text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MenuIcon size={24} />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block h-full bg-white text-gray-900 w-64 border-r border-gray-300 fixed md:relative top-0 left-0 z-10 md:z-auto`}
      >
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

      <div className={`md:ml-64 ${isMenuOpen ? "ml-0" : "ml-0"}`}></div>
    </div>
  );
};

export default AdminMenu;
