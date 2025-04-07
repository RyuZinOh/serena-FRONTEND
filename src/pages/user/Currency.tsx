import React, { useEffect, useState, useMemo } from "react";
import useAuth from "../../context/useAuth";
import UserLayout from "./UserLyout";
import { getCurrency } from "../../Apis/currrency";

interface CurrencyState {
  data: Awaited<ReturnType<typeof getCurrency>> | null;
  loading: boolean;
  error: string | null;
}

const Currency: React.FC = () => {
  const [authState] = useAuth();
  const { user, token } = authState;
  const [currencyState, setCurrencyState] = useState<CurrencyState>({
    data: null,
    loading: true,
    error: null,
  });

  const greeting = useMemo(() => {
    return user ? `Hello, ${user.name}!` : "Loading user info...";
  }, [user]);

  useEffect(() => {
    const fetchCurrency = async () => {
      if (!user?.id || !token) return;

      setCurrencyState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await getCurrency(user.id, token);
        setCurrencyState({ data, loading: false, error: null });
      } catch (error) {
        setCurrencyState({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    };

    fetchCurrency();
  }, [user?.id, token]);

  const { data: currency, loading, error } = currencyState;

  return (
    <UserLayout
      title="Currency"
      description="View your in-game currency balance"
    >
      <h1 className="text-2xl font-semibold mb-4">Serenex Wallet</h1>
      <p className="text-lg mb-6">{greeting}</p>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      {/* Currency data */}
      {!loading && currency && !error && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img
                src="https://github.com/RyuZinOh/static-assets/blob/main/serenex.png?raw=true"
                alt="Serenex Logo"
                className="w-10 h-10 mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Currency Name
                </h3>
                <span className="text-2xl font-medium text-gray-700">
                  {currency.coin_name}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Balance</h3>
              <span className="text-3xl font-bold text-green-600">
                {currency.coin_value} Serenex
              </span>
            </div>
          </div>
        </div>
      )}

      {/* No data state */}
      {!loading && !currency && !error && (
        <p className="text-gray-600 text-center font-medium">
          No currency data available.
        </p>
      )}
    </UserLayout>
  );
};

export default Currency;
