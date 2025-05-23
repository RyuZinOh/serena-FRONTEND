import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import HomeBg from "./HomeBg";
import HomeCard from "./HomeCard";

/**
 * Hero Section Component
 */
const HeroSection: React.FC<{ scrollY: number }> = ({ scrollY }) => (
  <div className="relative h-[700px] overflow-hidden bg-black">
    {/* Skewed Overlay */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-black via-black to-yellow-400 transform -skew-x-12 -translate-x-1/4"
      animate={{ y: scrollY * 0.3 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    />
    {/* Hero Content */}
    <motion.div
      className="absolute inset-0 flex items-center text-white px-4 sm:px-16 "
      animate={{ y: scrollY * 0.6 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <div className="text-left max-w-sm sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Become a <span className="text-yellow-400">Pokémon Master</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Join thousands of trainers in the ultimate Pokémon platform for
          battles, trading, and exploration across all regions!
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/appearance"
            className="bg-yellow-400 text-black font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full uppercase tracking-wide hover:bg-yellow-500 transition-all"
          >
            Start Your Journey
          </Link>
          <Link
            to="/about"
            className="border-2 border-white text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full uppercase tracking-wide hover:border-yellow-400 hover:text-yellow-400 transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>

    {/* Hero Images (Carousel) */}
    <div className="absolute right-12 top-0 h-full w-1/2 flex items-center justify-end hidden md:flex">
      {[1, 2, 3].map((index) => (
        <img
          key={index}
          src={`/assets/carousal_${index}.png`}
          alt={`Carousal ${index}`}
          className="w-1/4 h-auto transform -skew-x-6 -rotate-4 transition-transform duration-500 hover:scale-105"
        />
      ))}
    </div>
  </div>
);
/**
 * Trending Section Component
 */
const TrendingSection: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8 flex items-center gap-2">
      <h3 className="text-2xl font-bold text-gray-800">Trending Now</h3>
      <FaFire className="text-red-500" />
    </div>

    <div className="space-y-8">
      <HomeCard startIndex={1} />
      <HomeBg />
      <HomeCard startIndex={6} />
    </div>

    <div className="flex justify-center mt-16">
      <Link
        to="/appearance"
        className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full uppercase tracking-wide hover:bg-yellow-500 transition-all"
      >
        View More
      </Link>
    </div>
  </div>
);

/**
 * Main HomePage Component
 */
const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Layout
      title="Welcome to Serena - Pokémon Battle, Trade & Explore"
      description="Join Serena, the ultimate Pokémon platform for trainers to battle, trade, and explore the world of Pokémon!"
      author="Serena Team"
      keywords="Pokemon, Battle, Trade, Catch, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <HeroSection scrollY={scrollY} />
      <TrendingSection />
    </Layout>
  );
};

export default HomePage;
