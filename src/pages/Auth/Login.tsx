import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

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
  const [, setAuth] = useAuth();
  const navigate = useNavigate();
  const [failedAttempts, setFailedAttempts] = useState(0);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        data
      );
      const result = response.data;
      setAuth({ user: result.user, token: result.token });
      localStorage.setItem("auth", JSON.stringify(result));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setFailedAttempts((prev) => prev + 1);
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "An unexpected error occurred"
          : "An unexpected error occurred"
      );
    }
  };

  return (
    <Layout
      title="Login - Serena"
      description="Login to Serena platform"
      author="Serena Team"
      keywords="Login, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-1">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", { required: "Email is required" })}
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-transparent"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-transparent"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-black text-white rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
            >
              Login
            </button>
          </form>
          {failedAttempts > 0 && (
            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-red-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-black font-medium hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
