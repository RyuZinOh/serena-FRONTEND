import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { FaBars, FaTimes } from "react-icons/fa";

const BattlingStatus: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <Layout
      title="Battling Status - Serena"
      description="Track your ongoing battle status"
      author="Serena Team"
      keywords="battle, status, ongoing, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        {/* Sidebar menu */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative z-50 md:z-0`} 
        >
          <button
            className="md:hidden absolute top-4 right-4 text-gray-700 text-2xl hover:text-gray-900"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <UserMenu />
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Mobile menu toggle button */}
          <button
            className="md:hidden text-gray-700 text-xl mb-4 hover:text-gray-900 z-40" 
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          {/* Battling Status content */}
          <h1 className="text-2xl font-semibold mb-4">Battling Status</h1>
          <div className="flex justify-center items-center h-64">
            <span className="text-lg text-gray-500">Under Construction</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BattlingStatus;