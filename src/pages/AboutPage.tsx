import React from "react";
import Layout from "../components/Layout/Layout";
import { FaPaw, FaExchangeAlt, FaDumbbell } from "react-icons/fa"; // Pokémon related icons

const AboutPage: React.FC = () => {
  return (
    <Layout
      title="About Us - Serena"
      description="Learn more about Serena, the ultimate platform for Pokémon trainers to battle, trade, and explore!"
      author="Serena Team"
      keywords="Pokemon, Battle, Trade, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              About Serene Safal
            </h1>
            <p className="text-gray-600 text-lg">
              A world where trainers, adventurers, and battlers unite to catch,
              trade, and duel with Pokémon in exciting new ways.
            </p>
          </div>

          {/* About Information with Icons */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <FaPaw className="text-yellow-500 text-2xl" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">Incense</h3>
                <p className="text-gray-600">
                  Use battle incense to attract rare Pokémon! Activate the
                  incense during your adventure to increase your chances of
                  encountering powerful Pokémon in the wild.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaExchangeAlt className="text-blue-500 text-2xl" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">
                  Pokémon Trading
                </h3>
                <p className="text-gray-600">
                  Explore the vibrant market where trainers can trade Pokémon
                  with each other. Whether you're looking for rare species or
                  competitive battlers, the market is the place to be!
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaDumbbell className="text-green-500 text-2xl" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">
                  Dueling Arena
                </h3>
                <p className="text-gray-600">
                  Challenge other trainers in intense battles! Enter the dueling
                  arena to test your Pokémon's strength and strategy. Earn
                  rewards and rise through the ranks!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Whether you're a novice trainer or a seasoned champion, there's
              always something new to discover in the world of Serene Safal.
              Join us and begin your journey today!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
