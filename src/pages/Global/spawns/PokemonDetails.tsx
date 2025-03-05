import React from "react";
import { Pokemon } from "./types";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onVisualizeIV: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, onVisualizeIV }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-full sm:w-96 border-l-8 border-yellow-500 text-left">
    <div className="flex justify-between items-center mb-4">
      <img
        src="/assets/logo.png"
        alt="Incense War Logo"
        className="w-12 h-12 rounded-full"
      />
      <p className="text-xl font-bold text-gray-800">{pokemon.name}</p>
    </div>
    <p className="text-gray-600 mb-4">{pokemon.description}</p>
    <div className="text-gray-700">
      <p><strong>Types:</strong> {pokemon.types.join(", ")}</p>
      <p><strong>Japanese Name:</strong> {pokemon.japaneseName}</p>
      <p><strong>Height:</strong> {pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
      <div className="mt-4">
        <strong>IVs:</strong>
        <ul>
          <li>Attack: {pokemon.iv.attack}/31</li>
          <li>Defense: {pokemon.iv.defense}/31</li>
          <li>HP: {pokemon.iv.hp}/31</li>
          <li>Special Attack: {pokemon.iv.special_attack}/31</li>
          <li>Special Defense: {pokemon.iv.special_defense}/31</li>
          <li>Speed: {pokemon.iv.speed}/31</li>
        </ul>
        <button
          onClick={onVisualizeIV}
          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400 transition"
        >
          Visualize IV
        </button>
      </div>
    </div>
    <div className="mt-4">
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-full sm:w-72 h-auto mx-auto rounded-lg border-4 border-gray-300 shadow-lg"
      />
    </div>
  </div>
);

export default PokemonDetails;