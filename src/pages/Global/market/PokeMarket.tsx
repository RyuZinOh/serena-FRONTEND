import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { toast } from "react-toastify";
import useAuth from "../../../context/useAuth";
import { FaBookmark, FaSearch } from "react-icons/fa";

interface Pokemon {
  _id: string;
  name: string;
  description: string;
  price: number;
  stats: {
    attack: number;
    defense: number;
    hp: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  image: {
    data: string;
    contentType: string;
  };
}

const MarketSection: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/market/all`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setPokemons(data.pokemons);
      } catch (err: unknown) {
        setError((err as Error).message || "An error occurred");
      }
    };
    fetchPokemons();
  }, []);

  const filteredPokemons = searchQuery.trim()
    ? pokemons.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pokemons;

  const handleBuyClick = async (pokemonId: string) => {
    if (!token)
      return toast.error("You need to be logged in to buy a Pokémon.");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/market/buy/${pokemonId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Pokémon purchased successfully!");
      } else {
        toast.error(data.message || "Failed to purchase Pokémon");
      }
    } catch {
      toast.error("An error occurred while purchasing Pokémon");
    }
  };

  // Truncate description if it exceeds a certain length
  const MAX_DESCRIPTION_LENGTH = 35;
  const truncateDescription = (description: string) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
    }
    return description;
  };

  return (
    <Layout title="Market Section" description="Explore the market section.">
      {error ? (
        <div className="text-center text-red-500 mt-8">{error}</div>
      ) : (
        <div className="text-center p-8 mx-auto max-w-7xl">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2 md:w-1/3 mx-auto mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Search Pokémon"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>

          {/* Pokémon Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemons.length === 0 ? (
              <div className="text-center text-gray-600 col-span-full">
                No Pokémon found.
              </div>
            ) : (
              filteredPokemons.map((pokemon) => (
                <div
                  key={pokemon._id}
                  className="relative bg-white flex flex-col items-center text-center rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4"
                >
                  <FaBookmark
                    className="absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
                    title="Bookmark this Pokémon"
                  />

                  <div className="w-32 h-32 mt-4 rounded-full border-4 border-white">
                    <img
                      src={`data:${pokemon.image.contentType};base64,${pokemon.image.data}`}
                      alt={pokemon.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="px-4">
                    <span className="text-xl font-semibold text-gray-800">
                      {pokemon.name}
                    </span>
                    <p className="text-sm text-gray-600 mt-2">
                      {truncateDescription(pokemon.description)}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-gray-800 mt-2">
                    SRX {pokemon.price}
                  </p>

                  <div className="text-left w-full mr-4 text-sm text-gray-700">
                    {Object.entries(pokemon.stats).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key.replace("_", " ")}:</strong> {value}
                      </p>
                    ))}
                  </div>

                  <button
                    onClick={() => handleBuyClick(pokemon._id)}
                    className="bg-gray-800 px-6 py-2 text-white rounded-md mt-4 hover:bg-gray-700"
                  >
                    Buy Now
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MarketSection;
