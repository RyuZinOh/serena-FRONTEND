import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import useAuth from "../../context/useAuth";
import Cookies from "js-cookie";
import { FaBars, FaTimes, FaSpinner } from "react-icons/fa";


const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  return (
    <Layout
      title="Profile - Serena"
      description="User profile page"
      author="Serena Team"
      keywords="profile, user"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 text-white h-full transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }  md:translate-x-0 md:relative md:w-90 overflow-hidden z-50 sm:z-50 md:z-40`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-black text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <UserMenu />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-6 ${
            isMenuOpen ? "overflow-hidden" : "overflow-auto"
          }`}
        >
          {/* Mobile Sidebar Toggle Button */}
          <div className="block md:hidden mb-4">
            <button
              className="text-black text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Profile Content */}
          <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

          {loading && !profileImage && !syncing ? (
            <span className="text-lg text-gray-500">
              Generating profile image...
            </span>
          ) : error ? (
            <span className="text-lg text-red-500">{error}</span>
          ) : profileImage ? (
            <div className="flex justify-start items-center flex-col md:flex-row">
              <img
                src={profileImage}
                alt="Generated Profile"
                className="rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-4/5 m-auto mb-6 p-2"
              />
              <div className="md:ml-4 flex flex-col justify-center items-start">
                <button
                  onClick={syncData}
                  className="bg-black text-white px-6 py-2 rounded flex items-center justify-center"
                  disabled={syncing}
                >
                  {syncing ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    "Sync Data"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <span className="text-lg text-gray-500">
              No profile generated yet
            </span>
          )}

          {/* Cookie Consent Banner */}
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
      </div>
    </Layout>
  );
};

export default Profile;
