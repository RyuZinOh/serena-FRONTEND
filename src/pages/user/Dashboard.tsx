import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import useAuth from "../../context/useAuth";

const Dashboard: React.FC = () => {
  const [auth] = useAuth();

  return (
    <Layout
      title="Dashboard - Serena"
      description="User dashboard page"
      author="Serena Team"
      keywords="dashboard, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex">
        <div className="w-1/4">
          <UserMenu />
        </div>

        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">
            Welcome to Your Dashboard
          </h1>
          {auth.user ? (
            <p className="text-lg">Hello, {auth.user.name}!</p>
          ) : (
            <p className="text-lg">Loading user info...</p>
          )}

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
                onClick={() => alert("Redirecting to more information...")}
                className="bg-white text-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                Know More
              </button>
            </div>
          </div>

          <div>
            <p>
              Here you can manage your account, view your Pokémon, and more.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
