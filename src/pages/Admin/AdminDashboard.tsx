import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminDashboard: React.FC = () => {
  return (
    <Layout
      title="Admin Dashboard - Serena"
      description="Admin Dashboard page"
      author="Serena Admin Team"
      keywords="admin, dashboard, management"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen">
        {/* Admin Menu Sidebar */}
        <AdminMenu />
        {/* Main Content Area */}
        <div className="flex-1 bg-gray-100 p-8">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-gray-700">
            Welcome to the admin dashboard. Manage the application settings,
            users, and more.
          </p>
          {/* Add more admin-specific content here */}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
