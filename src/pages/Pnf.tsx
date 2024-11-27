import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "../components/Layout/Layout";

const Pnf: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => navigate("/");

  return (
    <Layout
      title="Page Not Found - Serena"
      description="Oops! We couldn't find the page you're looking for. Go back to the homepage."
      author="Serena Team"
      keywords="404, Page Not Found, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="min-h-screen flex justify-center items-center bg-white text-black">
        <div
          className="p-8 sm:p-10 rounded-3xl shadow-lg w-full max-w-lg text-center bg-gray-100 
                   transform transition-transform duration-700 ease-out scale-95 hover:scale-100"
        >
          <div className="mb-6">
            {/* Animated Icon with bounce effect */}
            <div className="text-6xl mx-auto mb-4 animate-bounce">
              <FaExclamationTriangle className="text-yellow-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-black animate-fadeIn">
              Oops! Page Not Found
            </h1>
            <p className="text-lg mb-6 text-gray-800">
              Sorry, we couldn’t find the page you were looking for.
            </p>
            <button
              onClick={handleBackHome}
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pnf;
