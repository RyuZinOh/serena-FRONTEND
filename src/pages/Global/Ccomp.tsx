import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../context/useAuth";

interface Image {
  url: string;
  description: string;
  price: string;
  name: string;
}

const Ccomp: React.FC = () => {
  const [cards, setCards] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

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
      } catch (err: unknown) {
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
  const currentItems = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

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
    <div className="pt-0 px-0">
      {error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="card flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-lg animate-pulse"
            >
              <Skeleton height={200} width="100%" />
            </div>
          ))}
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentItems.map((image) => (
              <div
                key={image.url}
                className="card flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)] relative"
              >
                <div className="relative group">
                  <img
                    src={image.url}
                    alt="Card"
                    className="w-full h-120 object-cover rounded-md"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-500">
                    <p className="text-md sm:text-lg md:text-xl text-center px-4 transform scale-95 group-hover:scale-100 transition-transform duration-500">
                      {image.description}
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 transform scale-95 group-hover:scale-100 transition-transform duration-500">
                      {image.price} SRX
                    </p>
                    <button
                      className="mt-4 px-6 py-2 bg-transparent border border-black text-white font-bold rounded-md hover:bg-black hover:bg-opacity-60 transition-all"
                      onClick={() => handleBuyCard(image.name)}
                    >
                      Buy
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

export default Ccomp;
