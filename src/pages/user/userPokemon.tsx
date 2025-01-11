import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { FaBars, FaTimes, FaTrash } from "react-icons/fa";

import axios from "axios";
import useAuth from "../../context/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPokemon: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  interface Pokemon {
    _id: string;
    pokemon: {
      sprite: string;
      name: string;
      types: string[];
      iv: {
        attack: number;
        defense: number;
        hp: number;
        special_attack: number;
        special_defense: number;
        speed: number;
      };
    };
  }

  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchUserPokemons = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pokemon_spawner/user_pokemons`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setPokemonList(response.data);
      } catch (error) {
        console.error("Error fetching user Pokémon data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPokemons();
  }, [auth.token]);

  const handleDelete = async (pokemonId: string) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/pokemon_spawner/delete_pokemon/${pokemonId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setPokemonList(pokemonList.filter((p) => p._id !== pokemonId));
      toast.success("Pokémon deleted successfully!");
    } catch (error) {
      console.error("Error deleting Pokémon", error);
      toast.error("Failed to delete Pokémon.");
    }
  };

  return (
    <Layout
      title="Your Pokémon - Serena"
      description="View your generated Pokémon"
      author="Serena Team"
      keywords="pokemon, user, collection"
      viewport="width=device-width, initial-scale=1.0"
    >
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
          className={`flex-1 p-1 overflow-hidden ${
            isMenuOpen ? "overflow-hidden" : "overflow-auto"
          }`}
        >
          <div className="block md:hidden mb-4">
            <button
              className="text-black text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <h1 className="text-2xl font-semibold mb-4">Your Pokémon</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">Sprite</th>
                  <th className="py-2 px-4 border-b text-center">Name</th>
                  <th className="py-2 px-4 border-b text-center">Types</th>
                  <th className="py-2 px-4 border-b text-center">HP</th>
                  <th className="py-2 px-4 border-b text-center">Attack</th>
                  <th className="py-2 px-4 border-b text-center">Defense</th>
                  <th className="py-2 px-4 border-b text-center">
                    Special Attack
                  </th>
                  <th className="py-2 px-4 border-b text-center">
                    Special Defense
                  </th>
                  <th className="py-2 px-4 border-b text-center">Speed</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  pokemonList.map((pokemon: Pokemon) => (
                    <tr key={pokemon._id}>
                      <td className="py-2 px-4 border-b text-center">
                        <img
                          src={pokemon.pokemon.sprite}
                          alt={pokemon.pokemon.name}
                          className="w-16 h-auto mx-auto"
                        />
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.name}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.types.join(", ")}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.iv.hp}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.iv.attack}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.iv.defense}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.iv.special_attack}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.iv.special_defense}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {pokemon.pokemon.iv.speed}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="text-red-600 text-lg"
                          onClick={() => handleDelete(pokemon._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPokemon;
