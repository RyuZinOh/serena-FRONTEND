import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type definitions
export interface PokemonIVs {
  attack: number;
  defense: number;
  hp: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface PokemonDetails {
  sprite: string;
  name: string;
  types: string[];
  iv: PokemonIVs;
}

export interface Pokemon {
  _id: string;
  pokemon: PokemonDetails;
}

// API functions
export const spawnerApi = {
  fetchUserPokemons: async (token: string): Promise<Pokemon[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/pokemon_spawner/user_pokemons`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  deleteUserPokemon: async (
    pokemonId: string,
    token: string
  ): Promise<void> => {
    await axios.delete(
      `${API_BASE_URL}/pokemon_spawner/delete_pokemon/${pokemonId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
