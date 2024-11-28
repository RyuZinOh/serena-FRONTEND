import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";
import Pnf from "./pages/Pnf"; // 404 page
import Construction from "./pages/Construction";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
// import ForgotPassword from "./pages/Auth/ForgetPassword";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/Private";
const NoMatch = () => {
  return <Pnf />;
};

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* nested private route */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/commandsector" element={<Construction />} />
        <Route path="/battlezone" element={<Construction />} />
        <Route path="/incensewar" element={<Construction />} />
        <Route path="/market" element={<Construction />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forget-password" element={<ForgotPassword />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
