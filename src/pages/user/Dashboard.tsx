import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu"; 
const Dashboard: React.FC = () => {
  return (
    <Layout
      title="Dashboard - Serena"
      description="Dashboard page"
      author="Serena Team"
      keywords="dashboard, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex">
        {/* User Menu on the left */}
        <div className="w-1/4">
          <UserMenu />
        </div>

        {/* Main Dashboard Content */}
        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <p>Welcome to your dashboard. Here you can manage your account, view statistics, and more.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
