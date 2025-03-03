import React, { useEffect, useState } from "react";

interface Background {
  url: string;
  description: string;
  price: number;
}

const BackgroundCard: React.FC<Background> = ({ url, description, price }) => (
  <div
    className="relative rounded-xl overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:scale-105"
    role="button"
    aria-label={`Background: ${description}, Price: ${price}`}
  >
    {/* Background Image */}
    <img
      src={url}
      alt={description}
      className="w-full h-full object-cover"
      loading="lazy"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    {/* Content Overlay */}
    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-lg font-semibold">{description}</p>
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
        setBackgrounds(data.backgrounds.slice(0, 3)); // Limit to 3 items
      } catch (err) {
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
    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px]">
      {backgrounds.map((background) => (
        <BackgroundCard key={background.url} {...background} />
      ))}
    </div>
  );
};

export default HomeBg;