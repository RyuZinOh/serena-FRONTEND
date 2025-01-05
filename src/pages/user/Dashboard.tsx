import React, { useMemo, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
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
          className={`fixed top-0 left-0 text-white h-full transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative sm:z-50 md:z-10 z-50`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-black text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <UserMenu />
        </div>

        {/* Main content */}
        <div
          className={`flex-1 p-6 ${
            isMenuOpen ? "overflow-hidden" : "overflow-auto"
          }`}
        >
          <div className="block md:hidden mb-4">
            <button
              className="text-black text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <h1 className="text-2xl font-semibold mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg">{greeting}</p>

          <div className="relative mb-6">
            <div className="overflow-hidden rounded-lg h-[550px]">
              <img
                src="/assets/cover.jpeg"
                alt="Dashboard Cover"
                className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-125"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleButtonClick}
                className="bg-white text-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                Know More
              </button>
            </div>
          </div>

          <p>Here you can manage your account, view your Pokémon, and more.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
