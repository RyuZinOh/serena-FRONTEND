import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../context/useAuth";

interface Image {
  url: string;
  description: string;
  price: number;
  name: string;
}

const Ccomp: React.FC = () => {
  const [cards, setCards] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const [authState] = useAuth();
  const token = authState.token;

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/card`
        );
        if (!response.ok) throw new Error("Failed to fetch cards");
        const data = await response.json();
        setCards(data.cards);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const currentItems = useMemo(
    () =>
      cards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [cards, currentPage, itemsPerPage]
  );

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  const handleBuyCard = async (cardName: string) => {
    if (!token) return toast.error("You must be logged in to purchase a card!");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/kamehameha/buy_card/${cardName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to purchase card.");
      }
      toast.success("Card purchased successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      {error ? (
        <div className="text-center text-red-500 font-semibold">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md animate-pulse"
            >
              <Skeleton height={450} width="100%" />
            </div>
          ))}
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentItems.map((image) => (
              <div
                key={image.url}
                className="bg-white p-1 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 relative"
              >
                <div className="relative group w-full h-[600px] overflow-hidden rounded-md">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover rounded-md group-hover:scale-110 group-hover:opacity-90 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity duration-300 rounded-md">
                    <p className="text-sm text-center">{image.description}</p>
                    <p className="text-lg font-bold mt-1">{image.price} SRX</p>
                    <button
                      className="mt-2 py-2 px-5 bg-yellow-400 text-black font-semibold text-sm rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300"
                      onClick={() => handleBuyCard(image.name)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaArrowLeft />
                Prev
              </button>
              <span className="text-sm font-semibold bg-gray-100 px-6 py-3 rounded-full shadow-md">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <FaArrowRight />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Ccomp;
