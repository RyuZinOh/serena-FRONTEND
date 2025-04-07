import React, { useMemo } from "react";
import UserLayout from "./UserLyout";
import useAuth from "../../context/useAuth";

const Dashboard: React.FC = () => {
  const [auth] = useAuth();

  const greeting = useMemo(() => {
    return auth.user ? `Hello, ${auth.user.name}!` : "Loading user info...";
  }, [auth.user]);

  const handleButtonClick = () => {
    alert("Redirecting to more information...");
  };

  return (
    <UserLayout title="Dashboard" description="User dashboard page">
      {/* Dashboard content */}
      <h1 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h1>
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
    </UserLayout>
  );
};

export default Dashboard;
