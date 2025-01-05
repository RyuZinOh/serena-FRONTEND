import React, { useEffect, useState, useCallback, useMemo } from "react";
import useAuth from "../../context/useAuth";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { FaBars, FaMinusCircle, FaTimes } from "react-icons/fa";
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

interface PokemonState {
  data: PokemonResponse["pokemons"] | null;
  loading: boolean;
  error: string | null;
}

const UserPokemon: React.FC = () => {
  const [auth] = useAuth();
  const [pokemonState, setPokemonState] = useState<PokemonState>({
    data: null,
    loading: true,
    error: null,
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const greeting = useMemo(() => {
    return auth.user ? `Hello, ${auth.user.name}!` : "Loading user info...";
  }, [auth.user]);

  const fetchPokemons = useCallback(async () => {
    if (auth.user && auth.token) {
      setPokemonState({ data: null, loading: true, error: null });
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/${auth.user.id}/pokemons`,
          {
            method: "GET",
            headers: {
              Authorization: `${auth.token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized! Please log in again.");
          } else if (response.status === 403) {
            throw new Error("You do not have access to this resource.");
          } else {
            throw new Error("An error occurred while fetching Pokémon data.");
          }
        }

        const data: PokemonResponse = await response.json();
        setPokemonState({ data: data.pokemons, loading: false, error: null });
      } catch (error) {
        setPokemonState({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    }
  }, [auth.user, auth.token]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const { data: pokemons, loading, error } = pokemonState;

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
          setPokemonState((prevState) => ({
            ...prevState,
            data: prevState.data ? prevState.data.filter(
              (pokemon) => pokemon._id !== pokemonId
            ) : null,
          }));
          toast.success("Pokemon deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          throw new Error("Failed to delete Pokemon");
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete Pokemon",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    }
  };

  return (
    <Layout
      title="UsersPokemons - Serena"
      description="Dashboard page to see users' Pokémon"
      author="Serena Team"
      keywords="dashboard, userpokemons"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 text-white w-64 h-full transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative  overflow-hidden z-50 sm:z-50 md:z-40 md:w-90`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-black text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <UserMenu />
        </div>

        {/* Main content */}
        <div
          className={`flex-1 p-5 ${
            isMenuOpen ? "overflow-hidden" : "overflow-auto"
          }`}
        >
          {/* Mobile Hamburger Menu Icon */}
          <div className="block md:hidden mb-4">
            <button
              className="text-black text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <h1 className="text-2xl font-semibold mb-4">Your Pokemon</h1>
          <p>{greeting}</p>

          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white table-auto border-separate border-spacing-1">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  {[
                    "Sprite",
                    "Name",
                    "Types",
                    "HP",
                    "Attack",
                    "Defense",
                    "Special Attack",
                    "Special Defense",
                    "Speed",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-sm font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pokemons?.map((pokemon) => (
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

          <ToastContainer />
        </div>
      </div>
    </Layout>
  );
};

export default UserPokemon;
