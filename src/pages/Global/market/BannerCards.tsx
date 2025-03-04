import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Bcomp from "./Bcomp";
import Ccomp from "./Ccomp";
import Tcomp from "./Tcomp";

const BannerCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "cards" | "backgrounds" | "titles"
  >("cards");

  return (
    <Layout
      title="Banner Cards"
      description="Explore stunning backgrounds, cards, and titles."
    >
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-7xl bg-white p-6">
          <div className="flex justify-center space-x-6 mb-4 relative">
            <div className="absolute inset-0 bg-[#0c1115] rounded-lg"></div>
            <div className="relative z-10 flex justify-center space-x-6 py-6">
              <a
                href="#"
                className={`flex items-center text-white text-lg font-medium relative transition-all duration-300 ${
                  activeTab === "cards" ? "text-white" : "text-white"
                } hover:text-yellow-500`}
                onClick={() => setActiveTab("cards")}
              >
                <span>Cards</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transform scale-x-0 origin-left transition-all duration-500 ${
                    activeTab === "cards" ? "scale-x-100" : "hover:scale-x-100"
                  }`}
                ></div>
              </a>

              <a
                href="#"
                className={`flex items-center text-white text-lg font-medium relative transition-all duration-300 ${
                  activeTab === "backgrounds" ? "text-white" : "text-white"
                } hover:text-yellow-500`}
                onClick={() => setActiveTab("backgrounds")}
              >
                <span>Backgrounds</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transform scale-x-0 origin-left transition-all duration-500 ${
                    activeTab === "backgrounds"
                      ? "scale-x-100"
                      : "hover:scale-x-100"
                  }`}
                ></div>
              </a>

              <a
                href="#"
                className={`flex items-center text-white text-lg font-medium relative transition-all duration-300 ${
                  activeTab === "titles" ? "text-white" : "text-white"
                } hover:text-yellow-500`}
                onClick={() => setActiveTab("titles")}
              >
                <span>Titles</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transform scale-x-0 origin-left transition-all duration-500 ${
                    activeTab === "titles" ? "scale-x-100" : "hover:scale-x-100"
                  }`}
                ></div>
              </a>
            </div>
          </div>

          <div className="w-full transition-all ease-in-out duration-300">
            {activeTab === "cards" && <Ccomp />}
            {activeTab === "backgrounds" && <Bcomp />}
            {activeTab === "titles" && <Tcomp />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BannerCards;
