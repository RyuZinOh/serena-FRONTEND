import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import apiClient from "../api/apiClient";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "1") {
        navigate("/admin-dashboard");
      } else if (role === "0") {
        navigate("/user-dashboard");
      }
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await apiClient.post("/user/login", data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      alert("Login successful!");

      if (user.role === 1) {
        navigate("/admin-dashboard");
      } else if (user.role === 0) {
        navigate("/user-dashboard");
      } else {
        setLoginError("Unknown role. Please contact support.");
      }
    } catch (error) {
      setLoginError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Invalid credentials"
          : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-field">
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              className="input-field"
            />
          </div>
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-field">
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input-field"
            />
          </div>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>

      {loginError && (
        <div className="error-container">
          <p className="error-message">{loginError}</p>
          <p>
            Forgot your password?{" "}
            <Link to="/forgetpass" className="forgot-link">
              Reset it here
            </Link>
          </p>
        </div>
      )}

      <div className="form-footer">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
