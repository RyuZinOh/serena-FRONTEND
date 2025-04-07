import axios from "axios";

interface Stats {
  attack: number;
  defense: number;
  hp: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface Pokemon {
  _id: string;
  name: string;
  description: string;
  price: number;
  stats: Stats | string; // Stats can be either object or string
  image: {
    data: string;
    contentType: string;
  };
}

interface ApiPokemon {
  _id: string;
  name: string;
  description: string;
  price: number;
  stats: Stats | string;
  image: {
    data: string;
    contentType: string;
  };
}

interface ApiResponse {
  pokemons: ApiPokemon[];
}

export const fetchOwnedPokemons = async (token: string): Promise<Pokemon[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_API_BASE_URL}/market/owned`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.pokemons.map((pokemon: ApiPokemon) => ({
      ...pokemon,
      stats:
        typeof pokemon.stats === "string"
          ? JSON.parse(pokemon.stats)
          : pokemon.stats,
    })) as Pokemon[];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Session expired");
    }
    throw new Error("Failed to fetch owned Pokémon");
  }
};
