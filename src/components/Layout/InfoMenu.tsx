import React from "react";

interface Stats {
  attack: number;
  defense: number;
  hp: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Pokemon {
  _id: string;
  name: string;
  description: string;
  price: number;
  stats: Stats;
  image: {
    data: string;
    contentType: string;
  };
}

interface InfoMenuProps {
  pokemon: Pokemon | null;
}

const InfoMenu: React.FC<InfoMenuProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <div>Select a Pokémon to view details.</div>;
  }

  return (
    <div className="w-full">
      <div className="text-lg font-semibold mb-4">Pokémon Details</div>
      <div className="mb-4">
        <img
          src={`data:${pokemon.image.contentType};base64,${pokemon.image.data}`}
          alt={pokemon.name}
          className="w-32 h-32 object-cover mb-4 mx-auto"
        />
        <h2 className="text-xl font-semibold">{pokemon.name}</h2>
        <p className="text-sm text-gray-600">{pokemon.description}</p>
        <div className="mt-4">
          <strong>Owned At:</strong> RS.{pokemon.price}
        </div>
        <div className="mt-4">
          <strong>Stats:</strong>
          <ul>
            <li>Attack: {pokemon.stats.attack}</li>
            <li>Defense: {pokemon.stats.defense}</li>
            <li>HP: {pokemon.stats.hp}</li>
            <li>Special Attack: {pokemon.stats.special_attack}</li>
            <li>Special Defense: {pokemon.stats.special_defense}</li>
            <li>Speed: {pokemon.stats.speed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoMenu;
