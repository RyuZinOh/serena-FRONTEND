import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import useAuth from "../../context/useAuth";
import { toast } from "react-toastify";
import LoginRequired from "../LoginRequired";

interface Pokemon {
  name: string;
  sprite: string;
}

const IncenseWar: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("");
  const [timer, setTimer] = useState(10);
  const [auth] = useAuth();
  const token = auth.token;

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setHint("");
    setGuess("");
    setTimer(10);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/pokemon_spawner/spawn`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPokemon(data.pokemon);
      } else {
        setError("Failed to spawn Pokémon");
      }
    } catch {
      setError("An error occurred while spawning Pokémon");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchPokemon();
  }, [token, fetchPokemon]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTime) => prevTime - 1);
      } else {
        fetchPokemon();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, fetchPokemon]);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      pokemon &&
      pokemon.name &&
      guess.toLowerCase() === pokemon.name.toLowerCase()
    ) {
      toast.success(`Successfully guessed ${pokemon.name}!`);
      setGuess("");
    } else {
      toast.error("Incorrect guess. Try again!");
    }
  };

  const generateHint = (pokemonName: string) => {
    const hintArray = pokemonName.split("").map((letter, index) => {
      return index % 2 === 0 ? "_" : letter;
    });
    setHint(hintArray.join(""));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGuess(e);
    }
  };

  if (!token) {
    return <LoginRequired />;
  }

  return (
    <Layout
      title="Incense War - Ignite Your Battle"
      description="Dive into Incense War, a world of strategic battles and mystical realms."
      author="Incense War Team"
      keywords="Incense War, Battle, Strategy, Mystical Realms"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="p-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          IncenseOnly
        </h1>

        <div className="mt-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {pokemon && (
            <div>
              <h2 className="text-xl font-semibold">Guess the Pokémon!</h2>
              <div className="mt-4">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="mx-auto"
                  style={{ width: 100, height: 100 }}
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Pokémon name"
                  className="input p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={() => generateHint(pokemon.name)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Show Hint
                </button>
                {hint && <p className="mt-2 text-lg">{hint}</p>}
              </div>
              <div className="mt-4">
                <p>Time left: {timer} seconds</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IncenseWar;
