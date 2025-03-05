import React, { useState } from "react";
import {
  FaEnvelope,
  FaQuestionCircle,
  FaLock,
  FaSpinner,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ForgotPasswordInputs) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
        data
      );
      toast.success(response.data.message || "Password updated successfully!");
      navigate("/login");
    } catch (error) {
      setFailedAttempts((prev) => prev + 1);
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "An unexpected error occurred"
          : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Forgot Password - Serena"
      description="Forgot password page"
      author="Serena Team"
      keywords="Forgot password, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Reset Your Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Security Question Input */}
            <div className="space-y-2">
              <div className="relative">
                <FaQuestionCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Answer to Security Question"
                  {...register("securityQues", {
                    required: "Answer is required",
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                />
              </div>
              {errors.securityQues && (
                <p className="text-sm text-red-600">
                  {errors.securityQues.message}
                </p>
              )}
            </div>

            {/* New Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                />
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Login Link */}
          {failedAttempts > 0 && (
            <div className="text-center mt-4">
              <Link to="/login" className="text-sm text-black hover:underline">
                Remembered your password? Login here
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
