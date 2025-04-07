import React from "react";
import UserLayout from "./UserLyout";

const TradeStatus: React.FC = () => {
  return (
    <UserLayout
      title="Trade Status"
      description="Check the status of your trade requests"
    >
      {/* Trade Status content */}
      <h1 className="text-2xl font-semibold mb-4">Trade Status</h1>
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-500">Under Construction</span>
      </div>
    </UserLayout>
  );
};

export default TradeStatus;
