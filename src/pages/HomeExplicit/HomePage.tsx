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
      className="absolute inset-0 flex items-center text-white pl-16"
      animate={{ y: scrollY * 0.6 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <div className="text-left max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to Serena</h1>
        <p className="text-xl mb-8">
          Join the ultimate Pokémon platform for trainers to battle, trade, and
          explore the world of Pokémon!
        </p>
        <Link
          to="/appearance"
          className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full uppercase tracking-wide hover:bg-yellow-500 transition-all"
        >
          Get Started
        </Link>
      </div>
    </motion.div>

    {/* Hero Images (Carousel) */}
    <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-end hidden md:flex">
      {[1, 2, 3].map((index) => (
        <img
          key={index}
          src={`/assets/carousal_${index}.png`}
          alt={`Carousal ${index}`}
          className="w-1/3 h-auto transform -skew-x-6 -rotate-6"
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
 * Upcoming Events Section
 */
const UpcomingEventsSection: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <h3 className="text-2xl font-bold text-gray-800 mb-8">Upcoming Events</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map((index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold mb-2">
            Pokémon Battle Tournament
          </h4>
          <p className="text-gray-600">Date: November 15, 2023</p>
          <p className="text-gray-600">Location: Online</p>
          <button className="mt-4 bg-yellow-400 text-black font-semibold py-2 px-6 rounded-full uppercase tracking-wide hover:bg-yellow-500 transition-all">
            Register Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Newsletter Signup Section
 */
const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear input after submission
  };

  return (
    <div className="bg-yellow-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-black mb-4">
          Subscribe to Our Newsletter
        </h3>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 rounded-l-full focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-r-full hover:bg-gray-800 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

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
      <UpcomingEventsSection />
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;
