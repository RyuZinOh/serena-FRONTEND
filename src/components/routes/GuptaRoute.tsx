import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuptaRoute: React.FC = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");

  if (auth?.token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default GuptaRoute;
