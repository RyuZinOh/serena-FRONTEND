import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import usePokemonSpawner from "./usePokemonSpawner";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import LoginRequired from "../../LoginRequired";
import { FaSearch, FaDice } from "react-icons/fa";
import PokemonDetails from "./PokemonDetails";
import IVChart from "./IVchart";
import useAuth from "../../../context/useAuth";

const IncenseWar: React.FC = () => {
  const [playSound] = useSound("/assets/swipe.mp3");
  const { pokemon, loading, spawnPokemon } = usePokemonSpawner(playSound);
  const [showModal, setShowModal] = useState(false);

  const [authState] = useAuth();
  if (!authState.token) {
    return <LoginRequired />;
  }

  return (
    <Layout
      title="Incense War - Generate Pokémon"
      description="Generate Pokémon and build your collection!"
      author="Incense War Team"
      keywords="Incense War, Pokémon, Collection"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Main Content */}
        <div
          className={`p-8 text-center flex flex-col md:flex-row gap-8 ${
            showModal ? "blur-md" : ""
          }`}
        >
          {/* Generator Section */}
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Pokémon Generator
              </h1>
              <p className="text-gray-600 mb-8">
                Click the button to generate a random Pokémon!
              </p>
              <div className="mt-6">
                <button
                  onClick={spawnPokemon}
                  disabled={loading}
                  className={`bg-red-500 text-white px-8 py-4 rounded-full shadow-lg font-semibold transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <FaDice className="animate-spin mr-2" />
                      Generating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaSearch className="mr-2" />
                      Generate Pokémon
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Pokémon Details Section */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            {pokemon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  mass: 0.5,
                }}
              >
                <PokemonDetails
                  pokemon={pokemon}
                  onVisualizeIV={() => setShowModal(true)}
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* IV Chart Modal */}
        <AnimatePresence>
          {showModal && pokemon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex justify-center items-center z-50"
            >
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowModal(false)}
              ></div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white p-8 rounded-lg shadow-lg relative z-10 w-full max-w-2xl"
              >
                <button
                  className="absolute top-4 right-4 text-gray-700 hover:text-black font-bold text-2xl"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
                <IVChart pokemon={pokemon} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default IncenseWar;
