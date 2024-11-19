import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login"; // Import the Login component
import ForgetPassword from "./components/ForgetPassword"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> {/* Register page at root */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/register" element={<Register />} /> {/* Register page */}
        <Route path="/forgetpass" element ={<ForgetPassword/>}/>
      </Routes>
    </Router>
  );
};

export default App;
