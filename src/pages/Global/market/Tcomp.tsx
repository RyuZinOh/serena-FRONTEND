import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../context/useAuth";
import { fetchTitles, buyTitle, Title } from "../../../Apis/kamehameha"; 

const Tcomp: React.FC = () => {
  const [authState] = useAuth();
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const TITLES_PER_PAGE = 15;

  useEffect(() => {
    const loadTitles = async () => {
      setLoading(true);
      try {
        const { titles, error } = await fetchTitles();
        if (error) {
          setError(error);
          toast.error("Failed to load titles!");
        } else {
          setTitles(titles);
        }
      } catch (err) {
        setError((err as Error)?.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    loadTitles();
  }, []);

  const handleBuyTitle = async (index: number) => {
    const token = authState.token;
    if (!token) {
      toast.error("You must be logged in to buy a title.");
      return;
    }

    try {
      const { success, message } = await buyTitle(index, token);
      if (success) {
        toast.success(message || "Title purchased successfully!");
      } else {
        toast.error(message || "Failed to purchase the title.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const totalPages = Math.ceil(titles.length / TITLES_PER_PAGE);
  const currentTitles = titles.slice(
    (currentPage - 1) * TITLES_PER_PAGE,
    currentPage * TITLES_PER_PAGE
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
      <ToastContainer position="top-right" autoClose={3000} />
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentTitles.length ? (
              currentTitles.map((title, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105"
                >
                  <h3 className="text-lg font-semibold mb-2">{title.name}</h3>
                  <p className="text-base mb-4">{title.price} SRX</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        handleBuyTitle(
                          (currentPage - 1) * TITLES_PER_PAGE + idx
                        )
                      }
                      className="py-1.5 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-all text-sm"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-xl">
                No titles available
              </p>
            )}
          </div>

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

export default Tcomp;
