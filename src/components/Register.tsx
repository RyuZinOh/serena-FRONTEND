import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import apiClient from "../api/apiClient";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa"; // React Icons
import "../css/register.css";
interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  securityQues?: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const userData = {
        ...data,
        role: 0, // default role as user (0)
      };

      const response = await apiClient.post("/user/register", userData);
      alert(response.data.message || "Registration successful!");
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-field">
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="input-field"
            />
          </div>
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>

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

        <div className="form-field">
          <div className="input-wrapper">
            <FaPhone className="input-icon" />
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone number is required" })}
              className="input-field"
            />
          </div>
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}
        </div>

        <div className="form-field">
          <div className="input-wrapper">
            <FaHome className="input-icon" />
            <input
              type="text"
              placeholder="Address (Optional)"
              {...register("address")}
              className="input-field"
            />
          </div>
        </div>

        <div className="form-field">
          <div className="input-wrapper">
            <FaQuestionCircle className="input-icon" />
            <input
              type="text"
              placeholder="Security Question (Optional)"
              {...register("securityQues")}
              className="input-field"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
