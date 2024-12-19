import React, { useEffect, useState, useCallback, useMemo } from "react";
import useAuth from "../../context/useAuth";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

interface CurrencyData {
  coin_name: string;
  coin_value: number;
}

interface CurrencyState {
  data: CurrencyData | null;
  loading: boolean;
  error: string | null;
}

const Currency: React.FC = () => {
  const [auth] = useAuth();
  const [currencyState, setCurrencyState] = useState<CurrencyState>({
    data: null,
    loading: true,
    error: null,
  });

  const greeting = useMemo(() => {
    return auth.user ? `Hello, ${auth.user.name}!` : "Loading user info...";
  }, [auth.user]);

  const fetchCurrency = useCallback(async () => {
    if (auth.user && auth.token) {
      setCurrencyState({ data: null, loading: true, error: null });
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
            throw new Error("Unauthorized! Please log in again.");
          } else if (response.status === 403) {
            throw new Error("You do not have access to this resource.");
          } else if (response.status === 404) {
            throw new Error("Currency data not found.");
          } else {
            throw new Error("An error occurred while fetching currency data.");
          }
        }

        const data: CurrencyData = await response.json();
        setCurrencyState({ data, loading: false, error: null });
      } catch (error) {
        setCurrencyState({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    }
  }, [auth.user, auth.token]);

  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  const { data: currency, loading, error } = currencyState;

  return (
    <Layout
      title="Currency - Serena"
      description="View your in-game currency balance"
      author="Serena Team"
      keywords="currency, serenex, balance"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        <UserMenu />
        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">Serenex Wallet</h1>
          <p className="text-lg mb-6">{greeting}</p>

          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          {!loading && currency && !error && (
            <div>
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
                        className="w-10 h-10 mr-4"
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
            </div>
          )}

          {!loading && !currency && !error && (
            <p className="text-gray-600 text-center font-medium">
              No currency data available.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Currency;
