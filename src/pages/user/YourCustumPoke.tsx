import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { toast } from "react-toastify";
import useAuth from "../../context/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";

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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hoveredPokemonId, setHoveredPokemonId] = useState<string | null>(null);

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

  return (
    <Layout title="Owned Pokemons - Serena" description="Your owned pokemons">
      <div className="flex h-screen bg-white">
        <div
          className={`fixed top-0 left-0 text-white w-64 h-full transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:w-90 overflow-hidden z-50 sm:z-50 md:z-40`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-black text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <UserMenu />
        </div>

        <div
          className={`flex-1 p-4 ${
            isMenuOpen ? "overflow-hidden" : "overflow-auto"
          } h-full`}
        >
          <div className="block md:hidden mb-4">
            <button
              className="text-black text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <h1 className="text-2xl font-semibold mb-4">
            View Your Owned Pokemons
          </h1>

          {error ? (
            <div className="text-center text-red-500 mt-8">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Image</th>
                    <th className="border border-gray-400 px-4 py-2">Name</th>
                    <th className="border border-gray-400 px-4 py-2">
                      boughtAt
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Attack</th>
                    <th className="border border-gray-400 px-4 py-2">
                      Defense
                    </th>
                    <th className="border border-gray-400 px-4 py-2">HP</th>
                    <th className="border border-gray-400 px-4 py-2">
                      Special Attack
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Special Defense
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Speed</th>
                  </tr>
                </thead>
                <tbody>
                  {ownedPokemons.map((pokemon) => (
                    <React.Fragment key={pokemon._id}>
                      <tr
                        onMouseEnter={() => setHoveredPokemonId(pokemon._id)}
                        onMouseLeave={() => setHoveredPokemonId(null)}
                        className="cursor-pointer"
                      >
                        <td className="border border-gray-400 px-4 py-2">
                          <img
                            src={`data:${pokemon.image.contentType};base64,${pokemon.image.data}`}
                            alt={pokemon.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {pokemon.name}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          रु. {pokemon.price} /-                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {pokemon.stats.attack}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {pokemon.stats.defense}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {pokemon.stats.hp}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {pokemon.stats.special_attack}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {pokemon.stats.special_defense}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {pokemon.stats.speed}
                        </td>
                      </tr>
                      {hoveredPokemonId === pokemon._id && (
                        <tr>
                          <td
                            colSpan={9}
                            className="border border-gray-400 px-4 py-2 bg-white text-center"
                          >
                            {"Description: " + pokemon.description}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default YourCustomPoke;
