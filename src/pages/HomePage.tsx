import React, { useState, useMemo } from "react";
import Layout from "../components/Layout/Layout";
import useAuth from "../context/useAuth";

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [auth] = useAuth();

  const images = useMemo(
    () => [
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pikachu.png",
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/battleTestament.jpg",
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pokemons.png",
    ],
    []
  );

  const slideTitles = useMemo(
    () => [
      "Catch 'Em All with Serena",
      "Battle Legendary Pokémon",
      "Explore the World of Pokémon",
    ],
    []
  );

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <Layout
      title="Welcome to Serena - Pokémon Battle, Trade & Explore"
      description="Join Serena, the ultimate Pokémon platform for trainers to battle, trade, and explore the world of Pokémon!"
      author="Serena Team"
      keywords="Pokemon, Battle, Trade, Catch, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="relative w-full h-[400px] md:h-[1080px] overflow-hidden z-0">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative group overflow-hidden"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}: ${slideTitles[index]}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl md:text-4xl text-shadow-lg transition-all duration-700 ease-in-out ${
                  currentSlide === index
                    ? "text-yellow-400 scale-110 opacity-100 animate-morphingText"
                    : "text-white scale-100 opacity-80"
                }`}
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

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 ${
                currentSlide === index ? "bg-white scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-2 bg-gray-50 mt-2 rounded-md shadow-md max-h-40 overflow-hidden z-10">
        <h3 className="font-semibold text-sm mb-1">Auth Debug Info</h3>
        <pre className="text-xs bg-gray-200 p-2 rounded overflow-ellipsis overflow-hidden">
          {JSON.stringify(auth).slice(0, 150)}
          {JSON.stringify(auth).length > 150 ? "..." : ""}
        </pre>
      </div>
    </Layout>
  );
};

export default HomePage;
