import React, { useEffect, useState } from "react";

interface Background {
  url: string;
  description: string;
  price: number;
}

const BackgroundCard: React.FC<Background> = ({ url, description, price }) => (
  <div
    className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
    role="button"
    aria-label={`Background: ${description}, Price: ${price}`}
  >
    <img
      src={url}
      alt={description}
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-500">
      <p className="text-lg text-center px-4">{description}</p>
      <p className="text-xl font-bold mt-2">{price} SRX</p>
    </div>
  </div>
);

const HomeBg: React.FC = () => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackgrounds = async () => {
      setLoading(true);
      setError(null);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-semibold">{error}</div>
    );
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 auto-rows-[300px]">
      {backgrounds.map((background) => (
        <BackgroundCard key={background.url} {...background} />
      ))}
    </div>
  );
};

export default HomeBg;
