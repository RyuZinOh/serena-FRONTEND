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
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageReport from "./pages/Admin/ManageReport";
import IncenseWar from "./pages/Global/InsenceWar";
import UserPokemon from "./pages/user/userPokemon";
import Currency from "./pages/user/Currency";
import TradeStatus from "./pages/user/TradeStatus";
import Profile from "./pages/user/Profile";
import BattlingStatus from "./pages/user/battlingStatus";
import MarketSection from "./pages/Global/PokeMarket";
import CustomPoke from "./pages/Admin/CustomPoke";
import YourCustumPoke from "./pages/user/YourCustumPoke";

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
        <Route path="/market" element={<MarketSection />} />

        {/* Protected User Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/pokemons" element={<UserPokemon />} />
          <Route path="user/currency" element={<Currency />} />
          <Route path="user/trades" element={<TradeStatus />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/battles" element={<BattlingStatus />} />
          <Route path="user/owned" element={<YourCustumPoke />} />
          
          

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
          <Route path="admin/users" element={<ManageUsers />} />
          <Route path="admin/reports" element={<ManageReport />} />
          <Route path="admin/custompoke" element={<CustomPoke />} />
        </Route>

        {/* Under Construction Pages */}
        <Route path="/commandsector" element={<Construction />} />
        <Route path="/battlezone" element={<Construction />} />
        <Route path="/incensewar" element={<IncenseWar />} />
       
        {/* Catch-All Route */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
