import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import InfoMenu from "../../components/Layout/InfoMenu";
import { toast } from "react-toastify";
import useAuth from "../../context/useAuth";
import { FaSearch } from "react-icons/fa";

interface Stats {
  attack: number;
  defense: number;
  hp: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Pokemon {
  _id: string;
  name: string;
  description: string;
  price: number;
  stats: Stats;
  image: {
    data: string;
    contentType: string;
  };
}

const YourCustomPoke: React.FC = () => {
  const [ownedPokemons, setOwnedPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    const fetchOwnedPokemons = async () => {
      if (!token) {
        toast.error("You need to be logged in to view your owned Pokémon.");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/market/owned`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          data.pokemons.forEach((pokemon: Pokemon) => {
            if (pokemon.stats && typeof pokemon.stats === "string") {
              pokemon.stats = JSON.parse(pokemon.stats);
            }
          });
          setOwnedPokemons(data.pokemons || []);
          setFilteredPokemons(data.pokemons || []);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch owned Pokémon.");
        }
      } catch {
        setError("An error occurred while fetching owned Pokémon.");
      }
    };

    fetchOwnedPokemons();
  }, [token]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPokemons(ownedPokemons);
    } else {
      setFilteredPokemons(
        ownedPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, ownedPokemons]);

  const handleViewMore = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <Layout title="Owned Pokemons - Serena" description="Your owned pokemons">
      <div className="flex h-screen bg-white">
        <div className="flex h-screen bg-white">
          <UserMenu />
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-4">
            View Your Owned Pokemons
          </h1>
          <div className="mb-8 w-60 h-12 relative flex rounded-xl mx-auto">
            <input
              required
              type="text"
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

          {error ? (
            <div className="text-center text-red-500 mt-8">{error}</div>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredPokemons.length === 0 ? (
                <div className="text-center">No Pokémon owned.</div>
              ) : (
                filteredPokemons.map((pokemon) => (
                  <div
                    key={pokemon._id}
                    className="card flex flex-col items-center cursor-pointer"
                    onClick={() => handleViewMore(pokemon)}
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
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="w-96 p-6 border-l border-gray-300 h-full">
          <InfoMenu pokemon={selectedPokemon} />
        </div>
      </div>
    </Layout>
  );
};

export default YourCustomPoke;
