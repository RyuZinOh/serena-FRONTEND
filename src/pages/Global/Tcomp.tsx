import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../context/useAuth";

const Tcomp: React.FC = () => {
  const [authState] = useAuth();
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const TITLES_PER_PAGE = 12;

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
        `${import.meta.env.VITE_API_BASE_URL}/kamehameha/buy_title/${index + 1}`,
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

  return (
    <div className="p-0 bg-white text-black">
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <section>
          <div className="hidden md:block">
            <table className="min-w-full border-spacing-0">
              <thead className="bg-black text-white">
                <tr>
                  {["No.", "Title", "Price", "Actions"].map((header) => (
                    <th key={header} className="border px-4 py-3 text-xl">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTitles.length ? (
                  currentTitles.map((title, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="border px-4 py-4">{(currentPage - 1) * TITLES_PER_PAGE + idx + 1}</td>
                      <td className="border px-4 py-4">{title.name}</td>
                      <td className="border px-4 py-4">{title.price} SRX</td>
                      <td className="border px-4 py-4">
                        <button
                          onClick={() => handleBuyTitle((currentPage - 1) * TITLES_PER_PAGE + idx)}
                          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700"
                        >
                          <FaShoppingCart />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center px-4 py-4">
                      No titles available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden grid gap-4">
            {currentTitles.map((title, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
              >
                <h3 className="text-xl font-semibold">{title.name}</h3>
                <p>{title.price} SRX</p>
                <button
                  onClick={() => handleBuyTitle((currentPage - 1) * TITLES_PER_PAGE + idx)}
                  className="mt-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700"
                >
                  <FaShoppingCart />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:bg-gray-400"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 mx-2 py-2 bg-gray-300 rounded-lg disabled:bg-gray-400"
            >
              <FaArrowRight />
            </button>
          </div>
        </section>
      )}
      <ToastContainer />
    </div>
  );
};

export default Tcomp;
