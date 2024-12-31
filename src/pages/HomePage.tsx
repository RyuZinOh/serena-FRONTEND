import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  interface Card {
    url: string;
    description: string;
    price: number;
  }

  interface Background {
    url: string;
    description: string;
    price: number;
  }

  const [cards, setCards] = useState<Card[]>([]);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loadingCards, setLoadingCards] = useState<boolean>(true);
  const [loadingBackgrounds, setLoadingBackgrounds] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const images = [
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pikachu.png",
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/battleTestament.jpg",
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pokemons.png",
  ];

  const slideTitles = [
    "Catch 'Em All with Serena",
    "Battle Legendary Pokémon",
    "Explore the World of Pokémon",
  ];

  useEffect(() => {
    const fetchCards = async () => {
      setLoadingCards(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/card`
        );
        if (!response.ok) throw new Error("Failed to fetch cards");
        const data = await response.json();
        setCards(data.cards.slice(0, 12)); 
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoadingCards(false);
      }
    };

    const fetchBackgrounds = async () => {
      setLoadingBackgrounds(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kamehameha/background`
        );
        if (!response.ok) throw new Error("Failed to fetch backgrounds");
        const data = await response.json();
        setBackgrounds(data.backgrounds.slice(0, 12)); 
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoadingBackgrounds(false);
      }
    };

    fetchCards();
    fetchBackgrounds();
  }, []);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Layout
      title="Welcome to Serena - Pokémon Battle, Trade & Explore"
      description="Join Serena, the ultimate Pokémon platform for trainers to battle, trade, and explore the world of Pokémon!"
      author="Serena Team"
      keywords="Pokemon, Battle, Trade, Catch, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="relative w-full h-[400px] md:h-[1080px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative overflow-hidden"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}: ${slideTitles[index]}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl md:text-4xl text-shadow-lg`}
              >
                {slideTitles[index]}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 md:p-4 rounded-full shadow-lg hover:bg-opacity-75 transition duration-300"
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 md:p-4 rounded-full shadow-lg hover:bg-opacity-75 transition duration-300"
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Featured Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loadingCards ? (
            <div>Loading cards...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            cards.map((card) => (
              <div
                key={card.url}
                className="card flex flex-col items-center relative bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
              >
                <div className="relative group">
                  <img
                    src={card.url}
                    alt={card.description}
                    className="w-full h-[450px] object-cover rounded-md"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-500">
                    <p className="text-lg text-center px-4">
                      {card.description}
                    </p>
                    <p className="text-xl font-bold mt-2">{card.price} SRX</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Featured Backgrounds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loadingBackgrounds ? (
            <div>Loading backgrounds...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            backgrounds.map((background) => (
              <div
                key={background.url}
                className="card flex flex-col items-center relative bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
              >
                <div className="relative group">
                  <img
                    src={background.url}
                    alt={background.description}
                    className="w-full h-[250px] object-cover rounded-md"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center flex-col text-white transition-opacity duration-500">
                    <p className="text-lg text-center px-4">
                      {background.description}
                    </p>
                    <p className="text-xl font-bold mt-2">
                      {background.price} SRX
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center items-center mt-8">
          <Link
            to="/appearance"
            className="text-white bg-black px-6 py-2 rounded-full text-lg font-semibold flex items-center gap-2"
          >
            View More <FaArrowRight />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
