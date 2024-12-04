import { useState, useEffect } from "react";
import useAuth from "../../context/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
  const [ok, setOk] = useState<boolean | null>(null);
  const [auth] = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthToken = async () => {
      const savedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      const token = savedAuth?.token || auth?.token;

      if (!token) {
        toast.info("No authentication token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user-auth`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          toast.error("Authentication failed. Please login again.");
          navigate("/login");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 403) {
            toast.error("Backend connection issue. Please try again later.");
          } else {
            toast.error("An error occurred while checking authentication.");
          }
        } else {
          toast.error("Failed to connect to the backend.");
        
        }
        setOk(false);
        navigate("/login");
      }
    };

    checkAuthToken();
  }, [auth?.token, navigate]);

  if (ok === null) {
    return null; 
  }

  return <Outlet />;
};

export default PrivateRoute;
