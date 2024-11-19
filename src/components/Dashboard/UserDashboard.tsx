import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (!token || role !== "0") {
      navigate("/login"); // Redirect if no token or not a user
    } else {
      setUsername(storedUsername || "User");
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
      <h2>User Dashboard</h2>
      <p>Welcome, {username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
