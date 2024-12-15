import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Profile: React.FC = () => {
  return (
    <Layout
      title="Profile - Serena"
      description="User profile page"
      author="Serena Team"
      keywords="profile, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex">
        <div className="w-1/4">
          <UserMenu />
        </div>

        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>
          <p>
            This page is currently under construction. Please check back later!
          </p>
          <div className="flex justify-center items-center h-64">
            <span className="text-lg text-gray-500">Under Construction</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;