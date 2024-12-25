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
        <ul className="flex gap-4">
          <li>
            <button
              className={`hover:underline ${
                activeTab === "backgrounds" ? "font-bold text-golden" : ""
              }`}
              onClick={() => setActiveTab("backgrounds")}
            >
              Backgrounds
            </button>
          </li>
          <li>
            <button
              className={`hover:underline ${
                activeTab === "cards" ? "font-bold text-golden" : ""
              }`}
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
