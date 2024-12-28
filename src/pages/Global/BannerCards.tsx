import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Bcomp from "./Bcomp";
import Ccomp from "./Ccomp";
import { CSSTransition } from "react-transition-group";

const BannerCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"backgrounds" | "cards">(
    "backgrounds"
  );

  return (
    <Layout
      title="Banner Cards"
      description="Explore stunning backgrounds and cards."
    >
      <nav className="p-4 bg-white text-black">
        <ul className="flex gap-4 items-center">
          <li>
            <button
              className={`px-6 py-2 rounded-lg border-2 transition-all ${
                activeTab === "backgrounds"
                  ? "font-bold text-golden border-golden"
                  : "border-transparent"
              } shadow-md hover:shadow-lg hover:border-gray-300`}
              onClick={() => setActiveTab("backgrounds")}
            >
              Backgrounds
            </button>
          </li>
          <li className="text-xl"> &gt;&gt; </li> 
          <li>
            <button
              className={`px-6 py-2 rounded-lg border-2 transition-all ${
                activeTab === "cards"
                  ? "font-bold text-golden border-golden"
                  : "border-transparent"
              } shadow-md hover:shadow-lg hover:border-gray-300`}
              onClick={() => setActiveTab("cards")}
            >
              Cards
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-8">
        <CSSTransition
          in={activeTab === "backgrounds"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Bcomp />
        </CSSTransition>

        <CSSTransition
          in={activeTab === "cards"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Ccomp />
        </CSSTransition>
      </div>
    </Layout>
  );
};

export default BannerCards;
