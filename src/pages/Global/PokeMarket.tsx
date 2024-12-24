import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import useAuth from "../../context/useAuth";

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
    setFilteredPokemons(
      searchQuery.trim()
        ? pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : pokemons
    );
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

  return (
    <Layout title="Market Section" description="Explore the market section.">
      {error ? (
        <div className="text-center text-red-500 mt-8">{error}</div>
      ) : (
        <div className="text-center p-8">
          {/* New Search Bar Design */}
          <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-white dark:bg-black shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300 mx-auto mb-8 border-2 border-black dark:border-white">
            <div className="flex items-center justify-center text-black dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none text-[20px] bg-transparent w-full text-black dark:text-white font-normal px-4"
              placeholder="Search Pokémon"
            />
          </div>

          {/* Pokémon Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading ? (
              // Loading state
              <div className="text-center">Loading...</div>
            ) : displayedPokemons.length === 0 ? (
              <div className="text-center">No Pokémon found.</div>
            ) : (
              displayedPokemons.map((pokemon) => (
                <div
                  key={pokemon._id}
                  className="card flex flex-col items-center bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="card-img-wrapper w-full h-56 mb-4 overflow-hidden">
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

          {/* Pagination */}
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
