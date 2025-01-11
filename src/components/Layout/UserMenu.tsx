import React, { useState, useEffect } from "react";
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
import axios from "axios";
import useAuth from "../../context/useAuth";

const UserMenu: React.FC = () => {
  const [auth] = useAuth();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const username = auth?.user?.name || "User";

  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/user/mypfp`, {
          headers: { Authorization: `${auth.token}` },
          responseType: "blob",
        })
        .then((response) => {
          setProfilePic(URL.createObjectURL(response.data));
        })
        .catch(() => {
          setProfilePic(null);
        });
    }
  }, [auth.token]);

  return (
    <div className="flex flex-col items-center bg-gray-50 text-gray-800 w-64 h-full p-6 shadow-md rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePic || "https://picsum.photos/200"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-3 shadow-md"
        />
        <span className="text-xl font-semibold">{username}</span>
      </div>

      <div className="space-y-4 w-full">
        <NavLink
          to="/dashboard/user/pokemons"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-100" : "hover:bg-indigo-200"
            } transition-all duration-200 ease-in-out`
          }
        >
          <HiOutlineHome className="text-2xl mr-4" />
          <span>Pokemons</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/currency"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-100" : "hover:bg-indigo-200"
            } transition-all duration-200 ease-in-out`
          }
        >
          <FaWallet className="text-2xl mr-4" />
          <span>Currency</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/trades"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-100" : "hover:bg-indigo-200"
            } transition-all duration-200 ease-in-out`
          }
        >
          <FaExchangeAlt className="text-2xl mr-4" />
          <span>Trade Status</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-100" : "hover:bg-indigo-200"
            } transition-all duration-200 ease-in-out`
          }
        >
          <FaUserCircle className="text-2xl mr-4" />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/battles"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-100" : "hover:bg-indigo-200"
            } transition-all duration-200 ease-in-out`
          }
        >
          <FaTrophy className="text-2xl mr-4" />
          <span>War Status</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/owned"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-100" : "hover:bg-indigo-200"
            } transition-all duration-200 ease-in-out`
          }
        >
          <FaPaw className="text-2xl mr-4" />
          <span>Owned</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/setting"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-100" : "hover:bg-indigo-200"
            } transition-all duration-200 ease-in-out`
          }
        >
          <FaCogs className="text-2xl mr-4" />
          <span>Tweaks</span>
        </NavLink>
      </div>

      <div className="mt-auto w-full">
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.reload();
          }}
          className="flex items-center p-3 w-full rounded-lg bg-gray-300 hover:bg-gray-400 mt-6 transition-all duration-200 ease-in-out"
        >
          <AiOutlineLogout className="text-2xl mr-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
