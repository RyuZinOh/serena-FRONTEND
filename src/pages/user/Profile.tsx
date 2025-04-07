import React, { useState, useEffect } from "react";
import UserLayout from "./UserLyout";
import useAuth from "../../context/useAuth";
import { FaSpinner } from "react-icons/fa";
import {
  generateProfileImage,
  syncProfileData,
  hasCookieConsent,
  setCookieConsent,
  getSavedProfileImage,
} from "../../Apis/kamehameha";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookieConsent, setCookieConsentState] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [authState] = useAuth();
  const token = authState.token;

  useEffect(() => {
    const savedImage = getSavedProfileImage();
    if (savedImage) {
      setProfileImage(savedImage);
      setLoading(false);
      return;
    }

    if (cookieConsent && token) {
      setLoading(true);
      generateProfileImage(token).then(({ imageUrl, error }) => {
        if (imageUrl) setProfileImage(imageUrl);
        if (error) setError(error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token, cookieConsent]);

  useEffect(() => {
    setCookieConsentState(hasCookieConsent());
  }, []);

  const handleSyncData = async () => {
    if (!token) return;
    setSyncing(true);
    const { imageUrl, error } = await syncProfileData(token);
    if (imageUrl) setProfileImage(imageUrl);
    if (error) setError(error);
    setSyncing(false);
  };

  const handleCookieConsent = () => {
    setCookieConsent();
    setCookieConsentState(true);
  };

  return (
    <UserLayout title="Profile" description="User profile page">
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
              onClick={handleSyncData}
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
        <span className="text-lg text-gray-500">No profile generated yet</span>
      )}

      {!cookieConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white py-4 px-6 flex justify-between items-center">
          <p className="text-sm">We use cookies to improve your experience.</p>
          <button
            onClick={handleCookieConsent}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
          >
            Accept
          </button>
        </div>
      )}
    </UserLayout>
  );
};

export default Profile;
