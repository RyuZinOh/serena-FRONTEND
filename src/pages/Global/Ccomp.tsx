import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Image {
  url: string;
  description: string;
  price: string;
}

const Ccomp: React.FC = () => {
  const [cards, setCards] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/card`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }

        const data = await response.json();
        setCards(data.cards);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
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

                  {/* Description and Price - Show on Hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-500">
                    <p className="text-md sm:text-lg md:text-xl text-center px-4 transform scale-95 group-hover:scale-100 transition-transform duration-500">
                      {image.description}
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 transform scale-95 group-hover:scale-100 transition-transform duration-500">
                      {image.price} SRX
                    </p>
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
