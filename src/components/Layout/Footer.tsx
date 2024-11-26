import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for active link styling

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white py-6">
      <footer className="text-center">
        <div className="mb-4">
          <p>&copy; 2024 Serene Safal. All Rights Reserved.</p>
        </div>
        <div className="flex justify-center space-x-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "hover:text-gray-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "hover:text-gray-400"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/policy"
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "hover:text-gray-400"
            }
          >
            Privacy Policy
          </NavLink>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
