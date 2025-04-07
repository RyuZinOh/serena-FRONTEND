import React, { useState, useEffect } from "react";
import UserLayout from "./UserLyout";
import useAuth from "../../context/useAuth";
import { fetchOwnedPokemons, Pokemon } from "../../Apis/ownedPokemon";

const YourCustomPoke: React.FC = () => {
  const [ownedPokemons, setOwnedPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPokemonId, setHoveredPokemonId] = useState<string | null>(null);
  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    if (!token) return;

    const loadOwnedPokemons = async () => {
      try {
        const pokemons = await fetchOwnedPokemons(token);
        setOwnedPokemons(pokemons);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    loadOwnedPokemons();
  }, [token]);

  return (
    <UserLayout title="Owned Pokemons" description="Your owned pokemons">
      <h1 className="text-2xl font-semibold mb-4">View Your Owned Pokemons</h1>

      {error ? (
        <div className="text-center text-red-500 mt-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Image</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
                <th className="border border-gray-400 px-4 py-2">Attack</th>
                <th className="border border-gray-400 px-4 py-2">Defense</th>
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
                    className="cursor-pointer hover:bg-gray-50"
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
                      रु. {pokemon.price} /-
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {typeof pokemon.stats !== "string" && pokemon.stats.attack}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {typeof pokemon.stats !== "string" && pokemon.stats.defense}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {typeof pokemon.stats !== "string" && pokemon.stats.hp}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {typeof pokemon.stats !== "string" && pokemon.stats.special_attack}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {typeof pokemon.stats !== "string" && pokemon.stats.special_defense}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {typeof pokemon.stats !== "string" && pokemon.stats.speed}
                    </td>
                  </tr>
                  {hoveredPokemonId === pokemon._id && (
                    <tr>
                      <td
                        colSpan={9}
                        className="border border-gray-400 px-4 py-2 bg-gray-100 text-center"
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
    </UserLayout>
  );
};

export default YourCustomPoke;
