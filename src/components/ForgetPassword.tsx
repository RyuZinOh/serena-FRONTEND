import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import apiClient from "../api/apiClient";
import axios from "axios";
import { FaEnvelope, FaQuestionCircle, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../css/forget-pass.css";

interface ForgotPasswordInputs {
  email: string;
  securityQues: string;
  newPassword: string;
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user-dashboard"); // Redirect to user dashboard if logged in
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    try {
      const response = await apiClient.post("/user/forgot-password", data);
      alert(response.data.message || "Password updated successfully!");
      navigate("/login"); // Redirect to login page after successful password reset
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Something went wrong");
      } else {
        console.error(error);
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
        {/* Email Input */}
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

        {/* Security Question Input */}
        <div className="form-field">
          <div className="input-wrapper">
            <FaQuestionCircle className="input-icon" />
            <input
              type="text"
              placeholder="Answer to Security Question"
              {...register("securityQues", {
                required: "Answer to security question is required",
              })}
              className="input-field"
            />
          </div>
          {errors.securityQues && (
            <p className="error-message">{errors.securityQues.message}</p>
          )}
        </div>

        {/* New Password Input */}
        <div className="form-field">
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input-field"
            />
          </div>
          {errors.newPassword && (
            <p className="error-message">{errors.newPassword.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Reset Password
        </button>
      </form>

      <div className="form-footer">
        <p>
          Remember your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
