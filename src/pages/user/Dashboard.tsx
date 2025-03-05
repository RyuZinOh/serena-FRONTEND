import React, { useMemo, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import useAuth from "../../context/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const [auth] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const greeting = useMemo(() => {
    return auth.user ? `Hello, ${auth.user.name}!` : "Loading user info...";
  }, [auth.user]);

  const handleButtonClick = () => {
    alert("Redirecting to more information...");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <Layout
      title="Dashboard - Serena"
      description="User dashboard page"
      author="Serena Team"
      keywords="dashboard, user"
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

          {/* Dashboard content */}
          <h1 className="text-2xl font-semibold mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg mb-6">{greeting}</p>

          {/* Cover image with button */}
          <div className="relative mb-6">
            <div className="overflow-hidden rounded-lg h-[550px]">
              <img
                src="/assets/cover.jpeg"
                alt="Dashboard Cover"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleButtonClick}
                className="bg-white text-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                Know More
              </button>
            </div>
          </div>

          {/* Additional content */}
          <p className="text-gray-700">
            Here you can manage your account, view your Pokémon, and more.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
