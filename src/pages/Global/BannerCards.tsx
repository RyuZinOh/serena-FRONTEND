import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Bcomp from "./Bcomp";
import Ccomp from "./Ccomp";
import Tcomp from "./Tcomp";
import { CSSTransition } from "react-transition-group";

const BannerCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cards" | "backgrounds" | "titles">("cards");

  return (
    <Layout
      title="Banner Cards"
      description="Explore stunning backgrounds and cards."
    >
      <nav className="p-4 bg-white text-black shadow-lg">
        <ul className="flex gap-8 items-center justify-center">
          <li>
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 transform ${
                activeTab === "cards"
                  ? "font-semibold text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-600 border-b-4 border-transparent"
              } hover:text-blue-600 hover:border-blue-600 hover:scale-105`}
              onClick={() => setActiveTab("cards")}
            >
              Cards
            </button>
          </li>

          <li>
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 transform ${
                activeTab === "backgrounds"
                  ? "font-semibold text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-600 border-b-4 border-transparent"
              } hover:text-blue-600 hover:border-blue-600 hover:scale-105`}
              onClick={() => setActiveTab("backgrounds")}
            >
              Backgrounds
            </button>
          </li>

          <li>
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 transform ${
                activeTab === "titles"
                  ? "font-semibold text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-600 border-b-4 border-transparent"
              } hover:text-blue-600 hover:border-blue-600 hover:scale-105`}
              onClick={() => setActiveTab("titles")}
            >
              Titles
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-8">
        <CSSTransition
          in={activeTab === "cards"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Ccomp />
        </CSSTransition>

        <CSSTransition
          in={activeTab === "backgrounds"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Bcomp />
        </CSSTransition>

        <CSSTransition
          in={activeTab === "titles"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Tcomp />
        </CSSTransition>
      </div>
    </Layout>
  );
};

export default BannerCards;
