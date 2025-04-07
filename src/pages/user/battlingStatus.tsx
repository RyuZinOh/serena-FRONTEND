import React from "react";
import UserLayout from "./UserLyout";
const BattlingStatus: React.FC = () => {
  return (
    <UserLayout
      title="Battling Status"
      description="Track your ongoing battle status"
    >
      <h1 className="text-2xl font-semibold mb-4">Battling Status</h1>
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-500">Under Construction</span>
      </div>
    </UserLayout>
  );
};

export default BattlingStatus;
