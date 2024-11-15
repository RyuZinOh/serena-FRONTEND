import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Register route as the root path */}
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
