import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import useAuth from "../../context/useAuth";
import { toast } from "react-toastify";
import {
  FaFileImage,
  FaEdit,
  FaCoins,
  FaShieldAlt,
  FaSearch,
  FaList,
} from "react-icons/fa";

const CustomPoke: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [ivStats, setIvStats] = useState({
    attack: "",
    defense: "",
    hp: "",
    special_attack: "",
    special_defense: "",
    speed: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const token = auth.token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price || !image) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("iv_stats", JSON.stringify(ivStats));
    formData.append("image", image);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/market/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add Pokémon");
      }
    } catch {
      toast.error("Error occurred while adding Pokémon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Add Pokémon - Admin Dashboard"
      description="Add new Pokémon to the market"
      author="Serena Admin Team"
      keywords="admin, add, pokemon, market"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen">
        <AdminMenu />
        <div className="flex-1 bg-white p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaEdit className="mr-2" />
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500"
                placeholder="Enter Pokémon name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaList className="mr-2" />
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500"
                placeholder="Enter Pokémon description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaCoins className="mr-2" />
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500"
                placeholder="Enter Pokémon price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaShieldAlt className="mr-2" />
                IV Stats
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "attack",
                  "defense",
                  "hp",
                  "special_attack",
                  "special_defense",
                  "speed",
                ].map((stat) => (
                  <div key={stat}>
                    <label className="block text-xs">
                      {stat.replace("_", " ").toUpperCase()}
                    </label>
                    <input
                      type="number"
                      value={ivStats[stat as keyof typeof ivStats]}
                      onChange={(e) =>
                        setIvStats({ ...ivStats, [stat]: e.target.value })
                      }
                      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500"
                      placeholder={`Enter ${stat}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaFileImage className="mr-2" />
                Image
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded-lg ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white font-bold flex items-center justify-center`}
              >
                {loading ? (
                  <FaSearch className="animate-spin mr-2" />
                ) : (
                  <FaSearch className="mr-2" />
                )}
                {loading ? "Adding..." : "Add Pokémon"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CustomPoke;
