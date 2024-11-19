import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (!token || role !== "1") {
      navigate("/login"); // Redirect if no token or not an admin
    } else {
      setUsername(storedUsername || "Admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
