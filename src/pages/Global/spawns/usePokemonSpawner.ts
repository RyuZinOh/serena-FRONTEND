import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../context/useAuth";
import { Pokemon } from "./types";

const usePokemonSpawner = (playSound: () => void) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const token = auth.token;

  const fetchPokemonDetails = async (pokemonId: number) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await res.json();

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      const description =
        speciesData.flavor_text_entries.find(
          (entry: { language: { name: string }; flavor_text: string }) =>
            entry.language.name === "en"
        )?.flavor_text || "No description available.";

      const japaneseName =
        speciesData.names.find(
          (name: { language: { name: string }; name: string }) =>
            name.language.name === "ja"
        )?.name || "No Japanese name available.";

      return {
        sprite: data.sprites.front_default,
        types: data.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
        description,
        japaneseName,
        height: data.height,
        weight: data.weight,
      };
    } catch {
      toast.error("Failed to fetch Pokémon details.");
    }
  };

  const spawnPokemon = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/pokemon_spawner/spawn`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const spriteUrl = data.pokemon.sprite;
        const pokemonId = spriteUrl.match(/pokemon\/(\d+)\.png/)?.[1];

        if (pokemonId) {
          const pokemonData = await fetchPokemonDetails(Number(pokemonId));
          setPokemon({
            ...data.pokemon,
            ...pokemonData,
          });
          playSound(); 
          toast.success(
            `New Pokémon generated! Your Pokémon list has been updated.`
          );
        }
      } else {
        toast.error("Failed to generate Pokémon. Please try again.");
      }
    } catch {
      toast.error("An error occurred while generating Pokémon.");
    } finally {
      setLoading(false);
    }
  }, [token, playSound]);

  return { pokemon, loading, spawnPokemon };
};

export default usePokemonSpawner;
