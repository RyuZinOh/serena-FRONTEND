import React, { useEffect, useState } from "react";
import UserLayout from "./UserLyout";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../context/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { spawnerApi, Pokemon } from "../../Apis/spawner";

const UserPokemon: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchUserPokemonsData = async () => {
      try {
        if (auth.token) {
          const data = await spawnerApi.fetchUserPokemons(auth.token);
          setPokemonList(data);
        } else {
          toast.error("Authentication token is missing.");
        }
      } catch (error) {
        console.error("Error fetching user Pokémon data", error);
        toast.error("Failed to fetch Pokémon data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPokemonsData();
  }, [auth.token]);

  const handleDelete = async (pokemonId: string) => {
    try {
      if (auth.token) {
        await spawnerApi.deleteUserPokemon(pokemonId, auth.token);
      } else {
        throw new Error("Authentication token is missing.");
      }
      setPokemonList(pokemonList.filter((p) => p._id !== pokemonId));
      toast.success("Pokémon deleted successfully!");
    } catch (error) {
      console.error("Error deleting Pokémon", error);
      toast.error("Failed to delete Pokémon.");
    }
  };

  return (
    <UserLayout title="Your Pokémon" description="View your generated Pokémon">
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
              <th className="py-2 px-4 border-b text-center">Special Attack</th>
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
                <td colSpan={10} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : pokemonList.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No Pokémon found.
                </td>
              </tr>
            ) : (
              pokemonList.map((pokemon) => (
                <tr key={pokemon._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">
                    <img
                      src={pokemon.pokemon.sprite}
                      alt={pokemon.pokemon.name}
                      className="w-16 h-auto mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center capitalize">
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
                      className="text-red-600 hover:text-red-800 text-lg"
                      onClick={() => handleDelete(pokemon._id)}
                      aria-label="Delete Pokémon"
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
    </UserLayout>
  );
};

export default UserPokemon;
