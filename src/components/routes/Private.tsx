import { useState, useEffect } from "react";
import useAuth from "../../context/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user-auth`,
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
          }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          toast.error("Authentication failed. Please login again.");
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
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      toast.info("No authentication token found. Redirect you to login");
      navigate("/login");
    }
  }, [auth?.token, navigate]);

  if (!ok) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
