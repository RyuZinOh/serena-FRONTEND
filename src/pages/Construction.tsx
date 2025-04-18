import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import Layout from "../components/Layout/Layout";

const Construction: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => navigate("/");

  return (
    <Layout
      title="Page Under Construction - Serena"
      description="This page is currently under construction. We're working hard to bring you an amazing experience. Stay tuned!"
      author="Serena Team"
      keywords="Construction, Coming Soon, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="min-h-screen flex justify-center items-center bg-white text-black">
        <div
          className="p-8 sm:p-10 rounded-3xl shadow-lg w-full max-w-lg text-center bg-gray-100 
                   transform transition-transform duration-700 ease-out scale-95 hover:scale-100"
        >
          <div className="mb-6">
            <div className="text-6xl mx-auto mb-4 animate-bounce">
              <FaTools className="text-yellow-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-black animate-fadeIn">
              Under Construction
            </h1>
            <p className="text-lg mb-6 text-gray-800">
              We're working hard to bring you this page. Stay tuned!
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

export default Construction;
