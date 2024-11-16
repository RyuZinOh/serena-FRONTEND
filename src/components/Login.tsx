import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import apiClient from "../api/apiClient";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
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

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await apiClient.post("/user/login", data);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Invalid credentials");
      } else {
        console.error(error);
        alert("An unexpected error occurred");
      }
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

      <div className="form-footer">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
