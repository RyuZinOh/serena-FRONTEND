import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../context/useAuth";

const Tcomp: React.FC = () => {
  const [authState] = useAuth();
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const TITLES_PER_PAGE = 15; // Updated number of items per page

  interface Title {
    name: string;
    price: number;
  }

  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/title`
        );
        if (!response.ok) throw new Error("Failed to fetch titles");

        const data = await response.json();
        setTitles(
          data?.titles
            ? Object.values(data.titles).map((value) => {
                const [name, price] = value as [string, number];
                return { name, price };
              })
            : []
        );
      } catch (err) {
        setError((err as Error)?.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchTitles();
  }, []);

  const handleBuyTitle = async (index: number) => {
    const token = authState.token;
    if (!token) return toast.error("You must be logged in to buy a title.");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/kamehameha/buy_title/${
          index + 1
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Title purchased successfully!");
      } else {
        toast.error(result.message || "Failed to purchase the title.");
      }
    } catch {
      toast.error("An error occurred while buying the title.");
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
          {/* Titles displayed in card format */}
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArrowLeft />
              Prev
            </button>

            {/* Page Number */}
            <span className="text-sm font-semibold bg-gray-100 px-4 py-2 rounded-full shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
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
