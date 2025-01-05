import React, { useEffect, useState } from "react";

interface Card {
  url: string;
  description: string;
  price: number;
}

interface HomeCardProps {
  startIndex: number;
}

const HomeCard: React.FC<HomeCardProps> = ({ startIndex }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/card`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        setCards(data.cards.slice(startIndex, startIndex + 5));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [startIndex]);

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[500px]">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        cards.map((card) => (
          <div
            key={card.url}
            className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
          >
            <img
              src={card.url}
              alt={card.description}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-500">
              <p className="text-lg text-center px-4">{card.description}</p>
              <p className="text-xl font-bold mt-2">{card.price} SRX</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeCard;
