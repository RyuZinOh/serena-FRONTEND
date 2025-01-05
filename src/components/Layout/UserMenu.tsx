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
    <div className="flex flex-col items-center bg-white text-black w-64 h-full p-6 shadow-xl border-2 border-gray-200 rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePic || "https://picsum.photos/200"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-3 shadow-lg border-4 border-indigo-200"
        />
        <span className="text-xl font-semibold text-gray-800">{username}</span>
      </div>

      <div className="space-y-6 w-full">
        <NavLink
          to="/dashboard/user/pokemons"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-200" : "hover:bg-gray-100"
            } transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200`
          }
        >
          <HiOutlineHome className="text-2xl mr-4" />
          <span>My Pokemons</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/currency"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-200" : "hover:bg-gray-100"
            } transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200`
          }
        >
          <FaWallet className="text-2xl mr-4" />
          <span>My Wallet</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/trades"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-200" : "hover:bg-gray-100"
            } transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200`
          }
        >
          <FaExchangeAlt className="text-2xl mr-4" />
          <span>Trade Center</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-200" : "hover:bg-gray-100"
            } transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200`
          }
        >
          <FaUserCircle className="text-2xl mr-4" />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/battles"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-200" : "hover:bg-gray-100"
            } transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200`
          }
        >
          <FaTrophy className="text-2xl mr-4" />
          <span>Battle Arena</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/owned"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-200" : "hover:bg-gray-100"
            } transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200`
          }
        >
          <FaPaw className="text-2xl mr-4" />
          <span>My Pets</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/setting"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium ${
              isActive ? "bg-indigo-200" : "hover:bg-gray-100"
            } transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200`
          }
        >
          <FaCogs className="text-2xl mr-4" />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="mt-auto w-full">
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.reload();
          }}
          className="flex items-center p-3 w-full rounded-lg bg-red-500 hover:bg-red-600 mt-6 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl border border-red-200"
        >
          <AiOutlineLogout className="text-2xl mr-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
