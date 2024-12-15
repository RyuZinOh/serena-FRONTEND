import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";

interface Pokemon {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    data: string;
    contentType: string;
  };
}

const MarketSection: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/market/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPokemons(data.pokemons);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "An error occurred");
        }
      } catch {
        setError("Failed to fetch Pokémon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading Pokémons...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const handleBuyClick = () => {
    toast.info("Buy functionality is yet to be implemented!");
  };

  return (
    <Layout
      title="Market Section"
      description="Explore the market section."
      author="Incense War Team"
      keywords="Market, Pokémon, Incense War"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="text-center p-8">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pokemons.map((pokemon) => (
            <div key={pokemon._id} className="card">
              <div className="card-img-wrapper">
                <img
                  src={`data:${pokemon.image.contentType};base64,${pokemon.image.data}`}
                  alt={pokemon.name}
                  className="card-img"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {pokemon.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {pokemon.description}
              </p>
              <p className="text-xl font-bold text-gray-800 mb-4">
                SRX {pokemon.price}
              </p>
              <button onClick={handleBuyClick} className="anime-btn w-full">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MarketSection;
