import React, { useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import useAuth from "../../context/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";
import useSound from "use-sound";
import LoginRequired from "../LoginRequired";
import { FaSearch, FaDice } from "react-icons/fa";

interface IV {
  attack: number;
  defense: number;
  hp: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Pokemon {
  name: string;
  sprite: string;
  types: string[];
  iv: IV;
  description: string;
  japaneseName: string;
  height: number;
  weight: number;
}

const IncenseWar: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [auth] = useAuth();
  const token = auth.token;

  const [playSound] = useSound("/assets/swipe.mp3");

  const fetchPokemonDetails = async (pokemonId: number) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await res.json();

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      const description =
        speciesData.flavor_text_entries.find(
          (entry: { language: { name: string }; flavor_text: string }) =>
            entry.language.name === "en"
        )?.flavor_text || "No description available.";

      const japaneseName =
        speciesData.names.find(
          (name: { language: { name: string }; name: string }) =>
            name.language.name === "ja"
        )?.name || "No Japanese name available.";

      return {
        sprite: data.sprites.front_default,
        types: data.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
        description,
        japaneseName,
        height: data.height,
        weight: data.weight,
      };
    } catch {
      toast.error("Failed to fetch Pokémon details.");
    }
  };

  const spawnPokemon = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/pokemon_spawner/spawn`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const spriteUrl = data.pokemon.sprite;
        const pokemonId = spriteUrl.match(/pokemon\/(\d+)\.png/)?.[1];

        if (pokemonId) {
          const pokemonData = await fetchPokemonDetails(Number(pokemonId));
          setPokemon({
            ...data.pokemon,
            ...pokemonData,
          });
          playSound();
          toast.success(
            `New Pokémon generated! Your Pokémon list has been updated.`
          );
        }
      } else {
        toast.error("Failed to generate Pokémon. Please try again.");
      }
    } catch {
      toast.error("An error occurred while generating Pokémon.");
    } finally {
      setLoading(false);
    }
  }, [token, playSound]);

  const IVChart = () => {
    if (!pokemon) return null;

    const data = [
      { name: "Attack", value: pokemon.iv.attack },
      { name: "Defense", value: pokemon.iv.defense },
      { name: "HP", value: pokemon.iv.hp },
      { name: "Special Attack", value: pokemon.iv.special_attack },
      { name: "Special Defense", value: pokemon.iv.special_defense },
      { name: "Speed", value: pokemon.iv.speed },
    ];

    const COLORS = [
      "#FF8042",
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF4444",
      "#4B0082",
    ];

    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4">{pokemon.name} IV Chart</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="mt-4">
          <ul className="flex flex-wrap justify-center gap-2 text-sm">
            {data.map((entry, index) => (
              <li key={entry.name} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 inline-block rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                {entry.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (!token) {
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
      <div className="relative">
        <div
          className={`p-8 text-center flex flex-col md:flex-row gap-8 ${
            showModal ? "blur-md" : ""
          }`}
        >
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                Pokémon Generator
              </h1>
              <div className="mt-6">
                {loading && <p>Loading...</p>}
                <div className="mt-8">
                  <button
                    onClick={spawnPokemon}
                    disabled={loading}
                    className={`bg-black text-white px-6 py-3 rounded shadow-md font-semibold transition-transform transform hover:scale-105 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <FaDice className="animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FaSearch className="mr-2" />
                        Generate Pokémon
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

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
                className="bg-white shadow-lg rounded-lg p-6 mx-auto w-full sm:w-96 border-l-8 border-yellow-500 text-left"
              >
                <div className="flex justify-between items-center mb-4">
                  <img
                    src="/src/logo.png"
                    alt="Incense War Logo"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {pokemon.name}
                  </p>
                </div>
                <p className="text-gray-600 mb-4">{pokemon.description}</p>
                <div className="text-gray-700">
                  <p>
                    <strong>Types:</strong> {pokemon.types.join(", ")}
                  </p>
                  <p>
                    <strong>Japanese Name:</strong> {pokemon.japaneseName}
                  </p>
                  <p>
                    <strong>Height:</strong> {pokemon.height / 10} m
                  </p>
                  <p>
                    <strong>Weight:</strong> {pokemon.weight / 10} kg
                  </p>
                  <div className="mt-4">
                    <strong>IVs:</strong>
                    <ul>
                      <li>Attack: {pokemon.iv.attack}/31</li>
                      <li>Defense: {pokemon.iv.defense}/31</li>
                      <li>HP: {pokemon.iv.hp}/31</li>
                      <li>Special Attack: {pokemon.iv.special_attack}/31</li>
                      <li>Special Defense: {pokemon.iv.special_defense}/31</li>
                      <li>Speed: {pokemon.iv.speed}/31</li>
                    </ul>
                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400 transition"
                    >
                      Visualize IV
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="w-full sm:w-72 h-auto mx-auto rounded-lg border-4 border-gray-300 shadow-lg"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg relative z-10">
              <button
                className="absolute top-2 right-2 text-gray-700 hover:text-black font-bold"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
              {IVChart()}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IncenseWar;
