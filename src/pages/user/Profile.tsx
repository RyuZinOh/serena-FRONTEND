import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import useAuth from "../../context/useAuth";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [syncing, setSyncing] = useState<boolean>(false);

  const [authState] = useAuth();
  const token = authState.token;

  const generateProfileImage = useCallback(async () => {
    if (!token) {
      setError("You need to be logged in to generate your profile.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/kamehameha/generate_profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
      Cookies.set("profile_image", imageUrl, { expires: 7 });
    } catch {
      setError("Failed to generate the profile image.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const syncData = async () => {
    setSyncing(true);
    setLoading(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/kamehameha/generate_profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
      Cookies.set("profile_image", imageUrl, { expires: 7 });
      setError(null);
    } catch {
      setError("Failed to sync profile data.");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const savedImage = Cookies.get("profile_image");
    if (savedImage) {
      setProfileImage(savedImage);
      setLoading(false);
    } else if (cookieConsent) {
      generateProfileImage();
    }
  }, [token, cookieConsent, generateProfileImage]);

  useEffect(() => {
    if (Cookies.get("cookie_consent")) {
      setCookieConsent(true);
    }
  }, []);

  const handleCookieConsent = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setCookieConsent(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout
      title="Profile - Serena"
      description="User profile page"
      author="Serena Team"
      keywords="profile, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        <div className="w-1/4">
          <UserMenu />
        </div>
        <div className="w-3/4 p-5 pt-12 mr-60">
          <div className="flex justify-center items-center h-64">
            {loading && !profileImage && !syncing ? (
              <span className="text-lg text-gray-500">
                Generating profile image...
              </span>
            ) : error ? (
              <span className="text-lg text-red-500">{error}</span>
            ) : profileImage ? (
              <div>
                <img
                  src={profileImage}
                  alt="Generated Profile"
                  className="rounded-lg shadow-lg"
                  style={{
                    width: "140%",
                    maxWidth: "1000px",
                    marginTop: "400px",
                  }}
                />
                <button
                  onClick={syncData}
                  className="mt-4 bg-black text-white px-4 py-2 rounded flex items-center justify-center"
                  disabled={syncing}
                >
                  {syncing ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    "Sync Data"
                  )}
                </button>
              </div>
            ) : (
              <span className="text-lg text-gray-500">
                No profile generated yet
              </span>
            )}
          </div>

          {!cookieConsent && !Cookies.get("cookie_consent") && (
            <div className="fixed bottom-0 left-0 w-full bg-black text-white py-4 px-6 flex justify-between items-center">
              <p className="text-sm">
                We use cookies to improve your experience. By continuing, you
                agree to our use of cookies.
              </p>
              <button
                onClick={handleCookieConsent}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
              >
                Accept
              </button>
            </div>
          )}
        </div>

        <div className="w-2/6 p-6 pt-12 bg-white border-l border-gray-300">
          <div className="flex items-center border rounded-lg p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Users..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent border-none focus:outline-none text-gray-700"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
