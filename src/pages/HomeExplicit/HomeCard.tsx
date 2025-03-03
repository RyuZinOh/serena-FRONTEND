import React, { useEffect, useState } from "react";

// Define types for the card data
interface Card {
  url: string;
  description: string;
  price: number;
}

interface HomeCardProps {
  startIndex: number;
}

// CardItem component for rendering each individual card
const CardItem: React.FC<Card> = ({ url, description, price }) => (
  <div
    className="relative rounded-xl overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:scale-105"
    role="button"
    aria-label={`Card: ${description}, Price: ${price}`}
  >
    {/* Card Image */}
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

// HomeCard component that fetches and displays the cards based on startIndex
const HomeCard: React.FC<HomeCardProps> = ({ startIndex }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/card`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }

        const data = await response.json();
        setCards(data.cards.slice(startIndex, startIndex + 5)); // Fetch 5 cards starting from `startIndex`
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [startIndex]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Error message display
  if (error) {
    return (
      <div className="text-red-500 text-center font-semibold">{error}</div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[500px]">
      {" "}
      {/* Increased the height here */}
      {cards.map((card) => (
        <CardItem key={card.url} {...card} />
      ))}
    </div>
  );
};

export default HomeCard;
