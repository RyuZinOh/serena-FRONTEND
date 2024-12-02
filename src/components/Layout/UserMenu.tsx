import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaPaw, FaMoneyBillAlt, FaExchangeAlt, FaFistRaised } from "react-icons/fa";
import useAuth from "../../context/useAuth"; 

const UserMenu: React.FC = () => {
  const [auth] = useAuth();
  const username = auth?.user?.name || "User";

  return (
    <div className="w-64 bg-white text-gray-900 p-6 h-full shadow-lg border-r border-gray-300">
      {/* User Info Section */}
      <div className="flex flex-col items-center mb-8">
        <span className="font-semibold text-lg">{username}</span>
      </div>

      {/* Menu Links */}
      <div className="space-y-6">
        {/* Your Pokemons Link */}
        <NavLink
          to="/user/pokemons"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium ${
              isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100 hover:text-black"
            } px-4 py-2 rounded-lg`
          }
        >
          <FaPaw className="text-xl" />
          <span>Your Pokemons</span>
        </NavLink>

        {/* Currency Status Link */}
        <NavLink
          to="/user/currency"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium ${
              isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100 hover:text-black"
            } px-4 py-2 rounded-lg`
          }
        >
          <FaMoneyBillAlt className="text-xl" />
          <span>Currency Status</span>
        </NavLink>

        {/* Trading Status Link */}
        <NavLink
          to="/user/trading-status"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium ${
              isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100 hover:text-black"
            } px-4 py-2 rounded-lg`
          }
        >
          <FaExchangeAlt className="text-xl" />
          <span>Trading Status</span>
        </NavLink>

        {/* Profile Link */}
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium ${
              isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100 hover:text-black"
            } px-4 py-2 rounded-lg`
          }
        >
          <FaUser className="text-xl" />
          <span>Profile</span>
        </NavLink>

        {/* Battling Status Link */}
        <NavLink
          to="/user/battling-status"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-sm font-medium ${
              isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100 hover:text-black"
            } px-4 py-2 rounded-lg`
          }
        >
          <FaFistRaised className="text-xl" />
          <span>Battling Status</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
