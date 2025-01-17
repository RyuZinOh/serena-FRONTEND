import React, { useEffect, useState } from "react";

interface Card {
  url: string;
  description: string;
  price: number;
}

interface HomeCardProps {
  startIndex: number;
}

const CardItem: React.FC<Card> = ({ url, description, price }) => (
  <div
    className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
    role="button"
    aria-label={`Card: ${description}, Price: ${price}`}
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

const HomeCard: React.FC<HomeCardProps> = ({ startIndex }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
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
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [startIndex]);

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
    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[500px]">
      {cards.map((card) => (
        <CardItem key={card.url} {...card} />
      ))}
    </div>
  );
};

export default HomeCard;
