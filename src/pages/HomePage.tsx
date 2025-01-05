// src/pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import HomeBg from "./HomeExplicit/HomeBg";
import HomeCard from "./HomeExplicit/HomeCard";
const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const mobileImages = [
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serenax_carou_1.jpg",
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serenax_carou_2.jpg",
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serenax_carou_3.jpg",
  ];

  const desktopImages = [
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pikachu.png",
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/battleTestament.jpg",
    "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pokemons.png",
  ];

  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Layout
      title="Welcome to Serena - Pokémon Battle, Trade & Explore"
      description="Join Serena, the ultimate Pokémon platform for trainers to battle, trade, and explore the world of Pokémon!"
      author="Serena Team"
      keywords="Pokemon, Battle, Trade, Catch, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="relative overflow-hidden">
        <Parallax
          bgImage={images[currentSlide]}
          strength={300}
          className="w-full h-[500px] sm:h-[750px] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div className="relative z-10 text-center text-white font-bold p-4">
            <h2 className="text-2xl sm:text-4xl">Catch 'Em All with Serena</h2>
            <p className="mt-2 text-lg">
              Your ultimate platform to train and battle Pokémon!
            </p>
          </div>
        </Parallax>
      </div>
      <div className="mt-8 text-left">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Trending Now</h3>
      </div>
      <HomeCard startIndex={0} />
      <HomeBg />
      <HomeCard startIndex={5} />

      <div className="flex justify-center items-center mt-4 mb-4">
        <Link
          to="/appearance"
          className="text-gray-800 text-lg font-medium border-2 border-gray-800 py-2 px-8 rounded-lg uppercase tracking-wide hover:bg-gray-800 hover:text-white transition-colors duration-300"
        >
          View More
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
