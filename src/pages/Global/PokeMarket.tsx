import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import useAuth from "../../context/useAuth";
import { FaSearch } from "react-icons/fa";

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
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [auth] = useAuth();
  const token = auth?.token;

  const itemsPerPage = 4; // Optimized for 4 cards per row

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/market/all`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch data");
        }
        const data = await response.json();
        setPokemons(data.pokemons);
        setFilteredPokemons(data.pokemons);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred");
        } else {
          setError("An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const filtered = searchQuery.trim()
      ? pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : pokemons;
    setFilteredPokemons(filtered);
    setCurrentPage(1);
  }, [searchQuery, pokemons]);

  const handleBuyClick = async (pokemonId: string) => {
    if (!token) {
      toast.error("You need to be logged in to buy a Pokémon.");
      return;
    }

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

  const handlePageChange = (page: number) => setCurrentPage(page);

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const displayedPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderSkeletons = (count: number) => (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 rounded-lg p-4 flex flex-col items-center animate-pulse"
        >
          <div className="w-28 h-28 bg-gray-400 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-400 w-3/4 rounded mb-2"></div>
          <div className="h-4 bg-gray-400 w-1/2 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout title="Market Section" description="Explore the market section.">
      {error ? (
        <div className="text-center text-red-500 mt-8">{error}</div>
      ) : (
        <div className="text-center p-8">
          <header className="sticky top-0 z-10">
            <div className="flex items-center justify-between py-4 px-6 w-full">
              <div className="relative w-full sm:w-1/2 md:w-1/3 max-w-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Search Pokémon"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>
          </header>

          {loading ? (
            renderSkeletons(4) // Optimized for 4 skeleton cards
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedPokemons.length === 0 ? (
                <div className="text-center">No Pokémon found.</div>
              ) : (
                displayedPokemons.map((pokemon) => (
                  <div
                    key={pokemon._id}
                    className="group relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden border-2 border-gray-900 shadow-2xl"
                  >
                    <div className="w-32 h-32 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 relative z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500">
                      <img
                        src={`data:${pokemon.image.contentType};base64,${pokemon.image.data}`}
                        alt={pokemon.name}
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    </div>

                    <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
                      <span className="text-2xl font-semibold">
                        {pokemon.name}
                      </span>
                      <p className="text-sm text-gray-600">
                        {pokemon.description}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-800 mb-4">
                      SRX {pokemon.price}
                    </p>
                    <div className="text-left mb-4 w-full px-2">
                      <p>
                        <strong>Attack:</strong> {pokemon.stats.attack}
                      </p>
                      <p>
                        <strong>Defense:</strong> {pokemon.stats.defense}
                      </p>
                      <p>
                        <strong>HP:</strong> {pokemon.stats.hp}
                      </p>
                      <p>
                        <strong>Special Attack:</strong>{" "}
                        {pokemon.stats.special_attack}
                      </p>
                      <p>
                        <strong>Special Defense:</strong>{" "}
                        {pokemon.stats.special_defense}
                      </p>
                      <p>
                        <strong>Speed:</strong> {pokemon.stats.speed}
                      </p>
                    </div>
                    <button
                      onClick={() => handleBuyClick(pokemon._id)}
                      className="bg-yellow-500 px-6 py-2 text-black rounded-md z-10 transform translate-y-[-10px] transition-all duration-500 hover:bg-yellow-400"
                    >
                      Buy Now
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MarketSection;
