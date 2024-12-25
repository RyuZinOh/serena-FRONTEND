import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Bcomp: React.FC = () => {
  interface BackgroundImage {
    url: string;
    name: string;
  }

  const [backgrounds, setBackgrounds] = useState<BackgroundImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBackgrounds();
  }, []);

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
    <div className="p-8">
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
          <h2 className="text-2xl font-bold mb-4">Backgrounds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentItems.map((image) => (
              <div
                key={image.url}
                className="card flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-56 object-cover rounded-md"
                  loading="lazy"
                />
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
