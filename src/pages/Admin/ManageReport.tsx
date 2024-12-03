import React from "react";
import Layout from "../../components/Layout/Layout"; 
import AdminMenu from "../../components/Layout/AdminMenu"; 

const ManageReport: React.FC = () => {
  return (
    <Layout
      title="Manage Report - Admin Dashboard"
      description="Manage Report page"
      author="Serena Admin Team"
      keywords="admin, report, management"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen">
        <AdminMenu />
        <div className="flex-1 bg-gray-100 p-8">
          <h1 className="text-2xl font-bold mb-4">Manage Report</h1>
        </div>
      </div>
    </Layout>
  );
};

export default ManageReport;
