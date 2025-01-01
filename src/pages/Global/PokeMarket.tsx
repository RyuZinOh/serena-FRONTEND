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

  const itemsPerPage = 4;

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
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="card flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-lg animate-pulse"
        >
          <div className="card-img-wrapper w-full h-72 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 w-full rounded"></div>
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
          <div className="relative mb-8 w-[90%] sm:w-[60%] mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-12 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search Pokémon"
            />
            <FaSearch className="absolute left-4 top-3 text-gray-500" />
          </div>

          {loading ? (
            renderSkeletons(4)
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayedPokemons.length === 0 ? (
                <div className="text-center">No Pokémon found.</div>
              ) : (
                displayedPokemons.map((pokemon) => (
                  <div
                    key={pokemon._id}
                    className="card flex flex-col items-center bg-white p-4 rounded-xl shadow-lg"
                  >
                    <div className="card-img-wrapper w-full h-72 mb-4 overflow-hidden">
                      <img
                        src={`data:${pokemon.image.contentType};base64,${pokemon.image.data}`}
                        alt={pokemon.name}
                        className="card-img w-full h-full object-cover object-top"
                      />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {pokemon.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {pokemon.description}
                    </p>
                    <p className="text-xl font-bold text-gray-800 mb-4">
                      SRX {pokemon.price}
                    </p>
                    <div className="card-iv-info text-left mb-4 w-full">
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
                      className="anime-btn w-full bg-gray-800 text-white py-2 rounded-lg"
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
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l-md disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r-md disabled:opacity-50"
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
