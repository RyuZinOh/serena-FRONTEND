import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { FaBars, FaTimes } from "react-icons/fa";

const TradeStatus: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Layout
      title="Trade Status - Serena"
      description="Check the status of your trade requests"
      author="Serena Team"
      keywords="trade, status, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        <div
          className={`fixed top-0 left-0 text-white w-64 h-full transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:w-90 overflow-hidden z-50 sm:z-50 md:z-40`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-black text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <UserMenu />
        </div>

        <div
          className={`flex-0 p-1 overflow-hidden ${
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
