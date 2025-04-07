import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import {
  FaWallet,
  FaExchangeAlt,
  FaUserCircle,
  FaTrophy,
  FaPaw,
  FaCogs,
} from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import useAuth from "../../context/useAuth";
import usePfp from "../../context/usepfp";

const UserMenu: React.FC = () => {
  const [auth] = useAuth();
  const { profilePic } = usePfp();
  const username = auth?.user?.name || "User";

  const menuItems = [
    {
      to: "/dashboard/user/pokemons",
      icon: <HiOutlineHome className="text-xl" />,
      label: "Pokemons",
    },
    {
      to: "/dashboard/user/currency",
      icon: <FaWallet className="text-xl" />,
      label: "Currency",
    },
    {
      to: "/dashboard/user/trades",
      icon: <FaExchangeAlt className="text-xl" />,
      label: "Trade Status",
    },
    {
      to: "/dashboard/user/profile",
      icon: <FaUserCircle className="text-xl" />,
      label: "Profile",
    },
    {
      to: "/dashboard/user/battles",
      icon: <FaTrophy className="text-xl" />,
      label: "War Status",
    },
    {
      to: "/dashboard/user/owned",
      icon: <FaPaw className="text-xl" />,
      label: "Owned",
    },
    {
      to: "/dashboard/user/setting",
      icon: <FaCogs className="text-xl" />,
      label: "Tweaks",
    },
  ];

  const getNavLinkClass = (isActive: boolean) =>
    `flex items-center p-2 rounded-lg text-sm font-medium transition-all duration-150 ease-in-out ${
      isActive
        ? "bg-gray-100 text-gray-700"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <div className="flex flex-col items-center bg-white text-gray-800 w-64 h-full p-6  rounded-xl border border-gray-200">
      {" "}
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePic || "https://picsum.photos/200"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover mb-3 shadow-md"
        />
        <span className="text-lg font-semibold truncate">{username}</span>
      </div>
      {/* Menu Items */}
      <div className="space-y-2 w-full">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </NavLink>
        ))}
      </div>
      {/* Logout Button */}
      <div className="mt-auto w-full">
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.reload();
          }}
          className="flex items-center justify-center p-3 w-full rounded-lg bg-black text-white"
        >
          <AiOutlineLogout className="text-xl" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
