import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../context/useAuth";

const Bcomp: React.FC = () => {
  interface BackgroundImage {
    url: string;
    name: string;
    description: string;
    price: string;
  }

  const [authState] = useAuth();
  const [backgrounds, setBackgrounds] = useState<BackgroundImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchBackgrounds = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/background`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch backgrounds");
        }

        const data = await response.json();
        setBackgrounds(data.backgrounds);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        toast.error("Failed to load backgrounds!");
      } finally {
        setLoading(false);
      }
    };

    fetchBackgrounds();
  }, []);

  const handleBuyBackground = async (backgroundName: string) => {
    try {
      const token = authState.token;
      if (!token) {
        toast.error("u need to login to buy any banners from here!");
        return;
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/kamehameha/buy_background/${backgroundName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(`Background "${backgroundName}" purchased successfully!`);
      } else {
        toast.error(result.message || "Purchase failed!");
      }
    } catch {
      toast.error("An error occurred during the purchase.");
    }
  };

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
    <div className="p-0">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-lg animate-pulse"
            >
              <Skeleton height={200} width="100%" />
            </div>
          ))}
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {currentItems.map((image) => (
              <div
                key={image.url}
                className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:scale-100 transition-transform hover:shadow-lg relative"
              >
                <div className="relative group w-full h-56 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover rounded-md group-hover:scale-110 group-hover:opacity-90 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-300">
                    <p className="text-sm text-center px-4">
                      {image.description}
                    </p>
                    <p className="text-xl font-bold mt-2">{image.price} SRX</p>
                    <button
                      className="mt-4 py-2 px-6 bg-yellow-400 text-black font-semibold text-lg rounded-full shadow-md hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
                      onClick={() => handleBuyBackground(image.name)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaArrowLeft />
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-primary flex items-center gap-2"
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
