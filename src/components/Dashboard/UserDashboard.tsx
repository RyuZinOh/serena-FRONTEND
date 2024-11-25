import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const [pokemon, setPokemon] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isCaught, setIsCaught] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "0") {
      navigate("/login");
    } else {
      fetchPokemon();
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPokemon();
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const fetchPokemon = async () => {
    const id = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setPokemon({
      name: data.name,
      image: data.sprites.front_default,
    });
    setMessage("");
    setIsCaught(false);
  };

  const handleGuess = () => {
    if (isCaught) {
      setMessage("You've already caught this Pokémon!");
    } else if (pokemon && guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setMessage("Caught Successfully!");
      setIsCaught(true);
    } else {
      setMessage("Wrong Pokémon name. Try again!");
    }
    setGuess("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div
      className="dashboard-container"
      style={{ display: "flex", gap: "20px", padding: "20px" }}
    >
      <div style={{ flex: 1, textAlign: "center" }}>
        <h2>Pokémon Spawner</h2>
        {pokemon ? (
          <img
            src={pokemon.image}
            alt="Guess the Pokémon"
            style={{ width: "150px", height: "150px", margin: "0 auto" }}
          />
        ) : (
          <p>Loading Pokémon...</p>
        )}
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>
        <h2>Catch the Pokémon</h2>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "80%",
            textAlign: "center",
            fontSize: "16px",
          }}
          disabled={isCaught}
        />
        <br />
        <button
          onClick={handleGuess}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: isCaught ? "not-allowed" : "pointer",
            backgroundColor: isCaught ? "#ccc" : "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
          disabled={isCaught}
        >
          Catch
        </button>
        {message && (
          <p
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              color: message.includes("Caught") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
