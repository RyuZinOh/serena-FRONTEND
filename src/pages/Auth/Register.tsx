import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

// RegisterFormInputs interface for form validation
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Used for navigation

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
    try {
      // Using the API URL from the environment variable
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/register`,
        { ...data, role: 0 }
      );
      toast.success(response.data.message || "Registration successful!");
      navigate("/"); // Navigate to the homepage after successful registration
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Something went wrong"
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Register - Serena"
      description="Join Serena today! Create your account to battle, trade, and explore the ultimate platform for Pokémon trainers."
      author="Serena Team"
      keywords="Register, Sign Up, Serena, Pokemon, Battle, Trade"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-1">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: "Name is required" })}
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", { required: "Email is required" })}
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
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
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Address (Optional)"
                  {...register("address")}
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="relative">
                <FaQuestionCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Security Question (Optional)"
                  {...register("securityQues")}
                  className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
