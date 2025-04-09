import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { FaBars, FaTimes } from "react-icons/fa";

interface UserLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({
  title,
  description,
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <Layout
      title={`${title} - Serena`}
      description={description}
      author="Serena Team"
      keywords={`${title.toLowerCase()}, user, dashboard`}
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        {/* Sidebar menu */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white  transform transition-transform duration-300 ease-in-out ${
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

          {/* Page-specific content */}
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default UserLayout;
