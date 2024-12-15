import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/market/all`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPokemons(data.pokemons);
          setFilteredPokemons(data.pokemons);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "An error occurred");
        }
      } catch {
        setError("Failed to fetch Pokémon data");
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPokemons(pokemons);
    } else {
      setFilteredPokemons(
        pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, pokemons]);

  const handleBuyClick = () => {
    toast.info("Buy functionality is yet to be implemented!");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const displayedPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout
      title="Market Section"
      description="Explore the market section."
      author="Incense War Team"
      keywords="Market, Pokémon, Incense War"
      viewport="width=device-width, initial-scale=1.0"
    >
      {error ? (
        <div className="text-center text-red-500 mt-8">{error}</div>
      ) : (
        <div className="text-center p-8">
          <div className="mb-8 w-60 h-12 relative flex rounded-xl mx-auto">
            <input
              required
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-black focus:shadow-md"
            />
            <label
              htmlFor="search"
              className="absolute top-1/2 left-4 px-2 transform -translate-y-1/2 font-light text-base bg-white text-black peer-focus:text-sm peer-focus:text-black peer-focus:left-3 peer-focus:-top-2 peer-valid:text-sm peer-valid:text-black peer-valid:left-3 peer-valid:-top-2 duration-150"
            >
              Search Pokémon
            </label>
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black" />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedPokemons.length === 0 ? (
              <div className="text-center">No Pokémon found.</div>
            ) : (
              displayedPokemons.map((pokemon) => (
                <div key={pokemon._id} className="card">
                  <div className="card-img-wrapper">
                    <img
                      src={`data:${pokemon.image.contentType};base64,${pokemon.image.data}`}
                      alt={pokemon.name}
                      className="card-img"
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
                  <div className="card-iv-info text-left mb-4">
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
                  <button onClick={handleBuyClick} className="anime-btn w-full">
                    Buy Now
                  </button>
                </div>
              ))
            )}
          </div>

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
