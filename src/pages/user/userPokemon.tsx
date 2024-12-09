import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import useAuth from "../../context/useAuth";
import { FaMinusCircle } from "react-icons/fa"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

interface IvStats {
  attack: number;
  defense: number;
  hp: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Pokemon {
  iv: IvStats;
  name: string;
  sprite: string;
  types: string[];
}

interface PokemonResponse {
  message: string;
  pokemons: {
    _id: string;
    message: string;
    pokemon: Pokemon;
    user_id: string;
  }[];
}

const UserPokemon: React.FC = () => {
  const [auth] = useAuth();
  const [pokemons, setPokemons] = useState<PokemonResponse["pokemons"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (auth.user && auth.token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/user/${
              auth.user.id
            }/pokemons`,
            {
              method: "GET",
              headers: {
                Authorization: `${auth.token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch Pokemons");
          }

          const data: PokemonResponse = await response.json();
          if (data.pokemons) {
            setPokemons(data.pokemons);
          } else {
            setError("No pokemons found.");
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPokemons();
  }, [auth.user, auth.token]);

  const deletePokemon = async (pokemonId: string) => {
    if (auth.user && auth.token) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/${
            auth.user.id
          }/delete-pokemon/${pokemonId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${auth.token}`,
            },
          }
        );

        if (response.ok) {
          setPokemons((prev) =>
            prev.filter((pokemon) => pokemon._id !== pokemonId)
          );
          toast.success("Pokemon deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error("Failed to delete Pokemon", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Error deleting Pokemon:", error);
        toast.error("Failed to delete Pokemon", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <Layout
      title="UsersPokemons - Serena"
      description="Dashboard page to see users pokemon"
      author="Serena Team"
      keywords="dashboard, userpokemons"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex">
        <div className="w-1/4">
          <UserMenu />
        </div>

        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">Your Pokemon</h1>
          <p>Here you can view and manage your Pokémon collection.</p>
          {loading && (
            <p className="text-gray-500 text-sm">Loading Pokemons...</p>
          )}
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white table-auto border-separate border-spacing-1">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Sprite
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Types
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    HP
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Attack
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Defense
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Special Attack
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Special Defense
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Speed
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pokemons.map((pokemon) => (
                  <tr key={pokemon._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={pokemon.pokemon.sprite}
                        alt={pokemon.pokemon.name}
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.name}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.types.join(", ")}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.iv.hp}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.iv.attack}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.iv.defense}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.iv.special_attack}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.iv.special_defense}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {pokemon.pokemon.iv.speed}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deletePokemon(pokemon._id)}
                      >
                        <FaMinusCircle className="inline-block text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ToastContainer to display toasts */}
      <ToastContainer />
    </Layout>
  );
};

export default UserPokemon;
