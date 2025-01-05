import React, { useEffect, useState } from "react";

interface Background {
  url: string;
  description: string;
  price: number;
}

const HomeBg: React.FC = () => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setBackgrounds(data.backgrounds.slice(0, 3));
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackgrounds();
  }, []);

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 auto-rows-[300px]">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        backgrounds.map((background) => (
          <div
            key={background.url}
            className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
          >
            <img
              src={background.url}
              alt={background.description}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-500">
              <p className="text-lg text-center px-4">
                {background.description}
              </p>
              <p className="text-xl font-bold mt-2">{background.price} SRX</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeBg;
