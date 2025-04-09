import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../context/useAuth";
import { fetchBackgrounds, buyBackground, BackgroundImage } from "../../../Apis/kamehameha";


const Bcomp: React.FC = () => {
  const [authState] = useAuth();
  const [backgrounds, setBackgrounds] = useState<BackgroundImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // 2 cards per row, 3 rows per page

  useEffect(() => {
    const loadBackgrounds = async () => {
      setLoading(true);
      try {
        const { backgrounds, error } = await fetchBackgrounds();
        if (error) {
          setError(error);
          toast.error("Failed to load backgrounds!");
        } else {
          setBackgrounds(backgrounds);
        }
      } 
      finally {
        setLoading(false);
      }
    };

    loadBackgrounds();
  }, []);

  const handleBuyBackground = async (backgroundName: string) => {
    if (!authState.token) {
      toast.error("You need to login to buy banners!");
      return;
    }

    try {
      const { success, message } = await buyBackground(
        backgroundName,
        authState.token
      );
      if (success) {
        toast.success(`Background "${backgroundName}" purchased successfully!`);
      } else {
        toast.error(message || "Purchase failed!");
      }
    } catch {
      toast.error("An error occurred during the purchase.");
    }
  };

  // Rest of the component remains the same...
  const totalPages = Math.ceil(backgrounds.length / itemsPerPage);
  const currentItems = backgrounds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {error ? (
        <div className="text-center text-red-500 font-semibold">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-md animate-pulse"
            >
              <Skeleton height={150} width="100%" />
            </div>
          ))}
        </div>
      ) : (
        <section>
          {/* 2 Cards Per Row, 3 Rows Total (6 Cards Per Page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentItems.map((image) => (
              <div
                key={image.url}
                className="flex flex-col items-center bg-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform hover:shadow-2xl relative"
              >
                <div className="relative group w-full h-60 overflow-hidden rounded-lg">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover rounded-md group-hover:scale-110 group-hover:opacity-90 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-300 rounded-lg">
                    <p className="text-sm text-center px-3">
                      {image.description}
                    </p>
                    <p className="text-lg font-bold mt-2">{image.price} SRX</p>
                    <button
                      className="mt-3 py-2 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold text-md rounded-full shadow-md hover:scale-105 transition-transform duration-300"
                      onClick={() => handleBuyBackground(image.name)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArrowLeft />
              Prev
            </button>
            <span className="text-sm font-semibold bg-gray-100 px-4 py-2 rounded-full shadow-md">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FaArrowRight />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Bcomp;
