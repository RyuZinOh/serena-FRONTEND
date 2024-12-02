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
import ForgotPassword from "./pages/Auth/ForgetPassword";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/Private";
import GuptaRoute from "./components/routes/GuptaRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoMatch = () => {
  return <Pnf />;
};

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected User Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          {/* Show Pnf for /dashboard */}
          <Route path="" element={<NoMatch />} />
        </Route>

        {/* Auth Routes for Login, Register, and Forgot Password */}
        <Route element={<GuptaRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Admin Dashboard Route */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        {/* Under Construction Pages */}
        <Route path="/commandsector" element={<Construction />} />
        <Route path="/battlezone" element={<Construction />} />
        <Route path="/incensewar" element={<Construction />} />
        <Route path="/market" element={<Construction />} />

        {/* Catch-All Route */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
