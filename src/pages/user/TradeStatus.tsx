import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const TradeStatus: React.FC = () => {
  return (
    <Layout
      title="Trade Status - Serena"
      description="Check the status of your trade requests"
      author="Serena Team"
      keywords="trade, status, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        <UserMenu />
        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">Trade Status</h1>
          <div className="flex justify-center items-center h-64">
            <span className="text-lg text-gray-500">Under Construction</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TradeStatus;
