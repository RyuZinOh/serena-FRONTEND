import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-black text-white py-6 px-6 relative z-20">
      <div className="flex justify-between items-center">
        <div className="flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-golden text-lg" : "text-lg hover:text-gray-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/battlezone"
            className={({ isActive }) =>
              isActive ? "text-golden text-lg" : "text-lg hover:text-gray-400"
            }
          >
            Battlezone
          </NavLink>
          <NavLink
            to="/commandsector"
            className={({ isActive }) =>
              isActive ? "text-golden text-lg" : "text-lg hover:text-gray-400"
            }
          >
            Commandsector
          </NavLink>
          <NavLink
            to="/incensewar"
            className={({ isActive }) =>
              isActive ? "text-golden text-lg" : "text-lg hover:text-gray-400"
            }
          >
            Incensewar
          </NavLink>
          <NavLink
            to="/market"
            className={({ isActive }) =>
              isActive ? "text-golden text-lg" : "text-lg hover:text-gray-400"
            }
          >
            Market
          </NavLink>
        </div>

        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2"
          >
            <img
              src="https://picsum.photos/200"
              alt="User Icon"
              className="w-8 h-8 rounded-full"
            />
            <span>Username</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-30">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Username
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Settings
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
