import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "../../assets/pikachu.png",
    "../../assets/battleTestament.jpg",
    "../../assets/pokemons.png",
  ];

  const slideTitles = [
    "Catch 'Em All with Serena",
    "Battle Legendary Pokémon",
    "Explore the World of Pokémon",
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <Layout
        title="Welcome to Serena - Pokémon Battle, Trade & Explore"
        description="Join Serena, the ultimate Pokémon platform for trainers to battle, trade, and explore the world of Pokémon!"
        author="Serena Team"
        keywords="Pokemon, Battle, Trade, Catch, Serena"
        viewport="width=device-width, initial-scale=1.0"
      >
        <div className="relative w-full h-[1080px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 left-8 text-white font-bold text-3xl">
                  {slideTitles[index]}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-opacity-75 transition duration-300"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-opacity-75 transition duration-300"
          >
            &#10095;
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentSlide === index ? "bg-white" : "bg-gray-400"
                } transition duration-300`}
              />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
