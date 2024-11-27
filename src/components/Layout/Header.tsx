import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const isLoggedIn = !!auth?.user;
  const username = auth?.user?.name || "User";

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) setAuth(JSON.parse(storedAuth));
  }, [setAuth]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: null });
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/battlezone", label: "Battlezone" },
    { to: "/commandsector", label: "Commandsector" },
    { to: "/incensewar", label: "Incensewar" },
    { to: "/market", label: "Market" },
  ];

  return (
    <header className="bg-black text-white py-6 px-6 relative z-20">
      <div className="flex justify-between items-center">
        <nav className="flex space-x-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-lg ${isActive ? "text-golden" : "hover:text-gray-400"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/register")}
              className="bg-golden text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
            >
              Join
            </button>
          ) : (
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
                <span>{username}</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-30">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      {username}
                    </li>
                    <li
                      onClick={() => navigate("/settings")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Settings
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-400"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
