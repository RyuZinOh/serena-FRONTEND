import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaPaw,
  FaMoneyBillAlt,
  FaExchangeAlt,
  FaFistRaised,
} from "react-icons/fa";
import useAuth from "../../context/useAuth";

const UserMenu: React.FC = () => {
  const [auth] = useAuth();
  const username = auth?.user?.name || "User";

  return (
    <div className="w-64 bg-white text-gray-900 p-4 h-full shadow-lg border-r border-gray-300 flex flex-col justify-between">
      {/* User Info Section */}
      <div className="flex items-center space-x-3 mb-6">
        <img
          src="https://picsum.photos/200"
          alt="User Icon"
          className="w-12 h-12 rounded-full"
        />
        <span className="font-semibold text-lg">{username}</span>
      </div>

      {/* Menu Links */}
      <div className="space-y-4">
        <NavLink
          to="/dashboard/user/pokemons"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 hover:text-gray-700"
            }`
          }
        >
          <FaPaw className="text-xl" />
          <span>Your Pokemons</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/currency"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 hover:text-gray-700"
            }`
          }
        >
          <FaMoneyBillAlt className="text-xl" />
          <span>Currency Status</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/trades"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 hover:text-gray-700"
            }`
          }
        >
          <FaExchangeAlt className="text-xl" />
          <span>Trading Status</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 hover:text-gray-700"
            }`
          }
        >
          <FaUser className="text-xl" />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/battles"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 hover:text-gray-700"
            }`
          }
        >
          <FaFistRaised className="text-xl" />
          <span>Battling Status</span>
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.reload(); // Reload to update state after logout
          }}
          className="w-full text-sm text-red-500 hover:bg-red-100 px-4 py-2 rounded-lg mt-4 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
