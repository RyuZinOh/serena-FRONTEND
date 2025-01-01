import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tcomp: React.FC = () => {
  interface Title {
    name: string;
    price: number;
  }

  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const titlesPerPage = 12;

  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/title`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch titles");
        }

        const data = await response.json();

        if (data && data.titles && typeof data.titles === "object") {
          const fetchedTitles = Object.values(data.titles).map((value) => {
            const [name, price] = value as [string, number];
            return { name, price };
          });

          if (fetchedTitles.length > 0) {
            setTitles(fetchedTitles);
          } else {
            throw new Error("No valid titles found");
          }
        } else {
          throw new Error("Titles not found in the response");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  const indexOfLastTitle = currentPage * titlesPerPage;
  const indexOfFirstTitle = indexOfLastTitle - titlesPerPage;
  const currentTitles = titles.slice(indexOfFirstTitle, indexOfLastTitle);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(titles.length / titlesPerPage);

  const handleBuyTitle = (titleName: string) => {
    toast.error(`Buying system yet to be added for title: ${titleName}`);
  };

  return (
    <div className="p-0 bg-white text-black">
      {error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <section>
          {/* Responsive Table */}
          <div className="hidden md:block">
            <table className="min-w-full table-auto border-separate border-spacing-0">
              <thead className="bg-black text-white">
                <tr className="text-center">
                  <th className="border px-4 py-3 text-xl font-semibold">
                    No.
                  </th>
                  <th className="border px-4 py-3 text-xl font-semibold">
                    Title
                  </th>
                  <th className="border px-4 py-3 text-xl font-semibold">
                    Price
                  </th>
                  <th className="border px-4 py-3 text-xl font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-black text-center">
                {currentTitles.length > 0 ? (
                  currentTitles.map((title, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="border px-4 py-4 text-lg">
                        {indexOfFirstTitle + index + 1}
                      </td>
                      <td className="border px-4 py-4 text-lg">{title.name}</td>
                      <td className="border px-4 py-4 text-lg">
                        {title.price} SRX
                      </td>
                      <td className="border px-4 py-4 text-lg">
                        <button
                          onClick={() => handleBuyTitle(title.name)}
                          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700"
                        >
                          <FaShoppingCart />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 text-center">
                      No titles available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile view as Cards */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-4">
              {currentTitles.map((title, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <h3 className="text-xl font-semibold">{title.name}</h3>
                  <p className="text-lg">{title.price} SRX</p>
                  <button
                    onClick={() => handleBuyTitle(title.name)}
                    className="mt-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <tfoot>
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center">
                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:bg-gray-400"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:bg-gray-400"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </section>
      )}

      <ToastContainer />
    </div>
  );
};

export default Tcomp;
