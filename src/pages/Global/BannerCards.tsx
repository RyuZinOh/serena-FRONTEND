import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Bcomp from "./Bcomp";
import Ccomp from "./Ccomp";
import Tcomp from "./Tcomp";
import { Menu } from "lucide-react";

const BannerCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cards" | "backgrounds" | "titles">("cards");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Layout
      title="Banner Cards"
      description="Explore stunning backgrounds and cards."
    >
      <button
        className="md:hidden absolute top-18 left-4 z-50 p-2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      <div className="flex h-screen">
        <nav
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-48 h-full bg-white shadow-md p-4 transition-transform duration-300`}
        >
          <ul className="flex flex-col gap-6 mt-12">
            <li>
              <button
                className={`w-full px-6 py-3 text-black rounded-lg transition-colors duration-300 ease-in-out bg-yellow-400 shadow-lg`}
                onClick={() => setActiveTab("cards")}
              >
                Cards
              </button>
            </li>

            <li>
              <button
                className={`w-full px-6 py-3 text-black rounded-lg transition-colors duration-300 ease-in-out bg-yellow-400 shadow-lg`}
                onClick={() => setActiveTab("backgrounds")}
              >
                Backgrounds
              </button>
            </li>

            <li>
              <button
                className={`w-full px-6 py-3 text-black rounded-lg transition-colors duration-300 ease-in-out bg-yellow-400 shadow-lg`}
                onClick={() => setActiveTab("titles")}
              >
                Titles
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex-1 p-8 overflow-auto custom-scrollbar">
          {activeTab === "cards" && <Ccomp />}
          {activeTab === "backgrounds" && <Bcomp />}
          {activeTab === "titles" && <Tcomp />}
        </div>
      </div>
    </Layout>
  );
};

export default BannerCards;
