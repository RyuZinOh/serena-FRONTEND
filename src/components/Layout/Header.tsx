import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth"; 
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import usePfp from "../../context/usepfp";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const { profilePic } = usePfp(); 
  const isLoggedIn = !!auth?.user;
  const username = auth?.user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: null });
    navigate("/login");
  };

  const handleDashboardRedirect = () => {
    navigate(auth?.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/battlezone", label: "Battlezone" },
    { to: "/botcmds", label: "Cmds" },
    { to: "/incensewar", label: "Incensewar" },
    { to: "/market", label: "Market" },
    { to: "/appearance", label: "Appearance" },
  ];

  return (
    <>
      <div className="bg-white-900 text-white py-2 z-50">
        <div className="container mx-auto px-4 flex justify-center items-center text-sm">
          <img
            src="/assets/serena.png"
            alt="Site Logo"
            className="h-10 w-auto sm:h-12"
          />
        </div>
      </div>
      <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>
            <div className="hidden lg:flex space-x-4 sm:space-x-8 justify-start w-full">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm sm:text-lg font-medium ${
                      isActive ? "text-golden" : "hover:text-gray-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              {!isLoggedIn ? (
                <button
                  onClick={() => navigate("/register")}
                  className="bg-golden text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                >
                  Join
                </button>
              ) : (
                <div className="relative z-60">
                  <div
                    onClick={toggleDropdown}
                    className="cursor-pointer flex items-center space-x-2"
                  >
                    <img
                      src={profilePic || "https://picsum.photos/200"}
                      alt="User Icon"
                      className="w-12 h-12 rounded-full"
                    />
                    <span className="font-medium">{username}</span>
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg z-60">
                      <ul>
                        <li
                          onClick={handleDashboardRedirect}
                          className="px-4 py-2 hover:text-golden cursor-pointer"
                        >
                          Dashboard
                        </li>
                        <li
                          onClick={handleLogout}
                          className="px-4 py-2 hover:text-red-500 cursor-pointer text-white"
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
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 w-1/2 h-full bg-black text-white rounded-r-2xl transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-50`}
      >
        <div className="flex flex-col items-start py-10 mt-8 ml-4">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 left-4 text-white text-3xl"
          >
            <X size={32} />
          </button>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? "text-golden" : "hover:text-gray-400"
                } py-2`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <a
            href="https://github.com/RyuZinOh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={32} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
