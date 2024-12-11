import React, { useEffect, useState } from "react";
import useAuth from "../../context/useAuth";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

interface CurrencyData {
  coin_name: string;
  coin_value: number;
}

const Currency: React.FC = () => {
  const [auth] = useAuth();
  const [currency, setCurrency] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      if (auth.user && auth.token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/currency/${auth.user.id}/get`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );

          if (!response.ok) {
            if (response.status === 401) {
              setError("Unauthorized! Please log in again.");
            } else if (response.status === 403) {
              setError("You do not have access to this resource.");
            } else if (response.status === 404) {
              setError("Currency data not found.");
            } else {
              setError("An error occurred while fetching currency data.");
            }
            return;
          }

          const data: CurrencyData = await response.json();
          setCurrency(data);
        } catch {
          setError("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCurrency();
  }, [auth.user, auth.token]);

  return (
    <Layout
      title="Currency - Serena"
      description="View your in-game currency balance"
      author="Serena Team"
      keywords="currency, serenex, balance"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex flex-col md:flex-row justify-between p-8">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <UserMenu />
        </div>
        <div className="w-full md:w-3/4">
          <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Serenex Wallet
              </h2>
              <p className="text-lg text-gray-600">
                Manage and track your Serenex currency here.
              </p>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-10">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {error && (
              <p className="text-red-600 text-center font-medium">{error}</p>
            )}

            {!loading && currency && !error && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Currency Name
                    </h3>
                    <div className="flex items-center mt-2">
                      <img
                        src="https://github.com/RyuZinOh/static-assets/blob/main/serenex.png?raw=true"
                        alt="Serenex Logo"
                        className="w-8 h-8 mr-4"
                      />
                      <span className="text-2xl font-medium text-gray-700">
                        {currency.coin_name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Balance
                    </h3>
                    <span className="text-3xl font-bold text-green-600">
                      {currency.coin_value} Serenex
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Account Overview
                  </h4>
                  <ul className="space-y-2 mt-4">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Currency Status</span>
                      <span className="text-green-500 font-medium">Active</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Last Update</span>
                      <span className="text-gray-500">Just now</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {!loading && !currency && !error && (
              <p className="text-gray-600 text-center font-medium">
                No currency data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Currency;
