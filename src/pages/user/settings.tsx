import React, { useState, useEffect } from "react";
import {
  FaTrashAlt,
  FaCamera,
  FaUserAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import useAuth from "../../context/useAuth";
import UserMenu from "./UserMenu";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Settings: React.FC = () => {
  const [auth] = useAuth();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (auth.token) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/user/mypfp`, {
          headers: { Authorization: `${auth.token}` },
          responseType: "blob",
        })
        .then((response) => {
          setProfilePic(URL.createObjectURL(response.data));
        })
        .catch(() => {
          setError("Failed to fetch profile picture.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth.token]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/uploadpfp`,
        formData,
        {
          headers: {
            Authorization: `${auth.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile picture uploaded successfully!");
      setProfilePic(URL.createObjectURL(file));
    } catch {
      setError("Failed to upload profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/user/deletepfp`,
        {
          headers: { Authorization: `${auth.token}` },
        }
      );
      toast.success("Profile picture deleted successfully!");
      setProfilePic(null);
    } catch {
      setError("Failed to delete profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        handleUpload(file);
      }
    },
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
  });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <Layout
      title="Profile Settings"
      description="User profile settings page"
      author="Serena Team"
      keywords="profile, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar menu */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative z-50 md:z-0`} // High z-index in mobile, low in desktop
        >
          <button
            className="md:hidden absolute top-4 right-4 text-gray-700 text-2xl hover:text-gray-900"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <UserMenu />
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Mobile menu toggle button */}
          <button
            className="md:hidden text-gray-700 text-xl mb-4 hover:text-gray-900 z-40" // Lower z-index than sidebar in mobile
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <h1 className="text-4xl font-semibold mb-8 text-gray-800">
            Profile Settings
          </h1>
          <div className="text-lg mb-8 text-gray-600">
            {auth.user ? `Hello, ${auth.user.name}!` : "Loading user info..."}
          </div>

          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          {/* Profile picture upload section */}
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center gap-6 p-8 border-4 border-dashed rounded-lg border-gray-300 bg-gray-50 transition duration-300 ease-in-out hover:border-blue-500 cursor-pointer"
          >
            <div className="text-center mb-4 text-gray-500">
              <p>
                Drag and drop your new profile picture here or click to upload
              </p>
            </div>

            <div className="relative w-48 h-48 border-4 border-dashed rounded-full overflow-hidden bg-gray-100 group transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <FaUserAlt size={40} className="text-gray-500" />
                </div>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaCamera size={24} className="mb-2" />
                <span>Upload</span>
              </div>

              <input {...getInputProps()} />
            </div>

            {/* Delete button */}
            <div className="flex gap-6">
              <button
                onClick={handleDelete}
                disabled={loading || !profilePic}
                className={`flex items-center justify-center px-6 py-2 rounded-full shadow-lg transition ${
                  loading || !profilePic
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
                }`}
                title="Delete your profile picture"
              >
                <FaTrashAlt className="mr-2" />
                Delete Picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
