import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";
import Pnf from "./pages/Pnf"; // 404 page
import Construction from "./pages/Construction";

const NoMatch = () => {
  return <Pnf />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/commandsector" element={<Construction />} />
      <Route path="/battlezone" element={<Construction />} />
      <Route path="/incensewar" element={<Construction />} />
      <Route path="/market" element={<Construction />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
