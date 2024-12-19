import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserAlt,
  FaPaw,
  FaWallet,
  FaExchangeAlt,
  FaGlasses,
} from "react-icons/fa";
import useAuth from "../../context/useAuth";
import { MdPets } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

const UserMenu: React.FC = () => {
  const [auth] = useAuth();
  const username = auth?.user?.name || "User";

  return (
    <div className="otherworldly-container">
      <div className="identity-section">
        <div className="avatar-container">
          <img
            src="https://picsum.photos/200"
            alt="User Avatar"
            className="avatar-image"
          />
        </div>
        <span className="identity-name">{username}</span>
      </div>

      <div className="navigation-space">
        <NavLink
          to="/dashboard/user/pokemons"
          className={({ isActive }) =>
            `navigation-item ${
              isActive ? "active-navigation" : "hover-navigation"
            }`
          }
        >
          <FaPaw className="navigation-icon" />
          <span>Your Pokemons</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/currency"
          className={({ isActive }) =>
            `navigation-item ${
              isActive ? "active-navigation" : "hover-navigation"
            }`
          }
        >
          <FaWallet className="navigation-icon" />
          <span>Currency Status</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/trades"
          className={({ isActive }) =>
            `navigation-item ${
              isActive ? "active-navigation" : "hover-navigation"
            }`
          }
        >
          <FaExchangeAlt className="navigation-icon" />
          <span>Trading Status</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `navigation-item ${
              isActive ? "active-navigation" : "hover-navigation"
            }`
          }
        >
          <FaUserAlt className="navigation-icon" />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/battles"
          className={({ isActive }) =>
            `navigation-item ${
              isActive ? "active-navigation" : "hover-navigation"
            }`
          }
        >
          <FaGlasses className="navigation-icon" />
          <span>Battling Status</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/owned"
          className={({ isActive }) =>
            `navigation-item ${
              isActive ? "active-navigation" : "hover-navigation"
            }`
          }
        >
          <MdPets className="navigation-icon" />
          <span>Owned Pokemons</span>
        </NavLink>
      </div>

      <div className="exit-button-space">
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.reload();
          }}
          className="logout-button"
        >
          <IoLogOutOutline className="exit-icon" />
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
