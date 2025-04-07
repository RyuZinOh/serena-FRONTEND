import axios from "axios";
import Cookies from "js-cookie";

interface GenerateProfileResponse {
  imageUrl: string | null;
  error: string | null;
}

export const generateProfileImage = async (
  token?: string
): Promise<GenerateProfileResponse> => {
  if (!token) return { imageUrl: null, error: "Login required" };

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/kamehameha/generate_profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const imageUrl = URL.createObjectURL(response.data);
    if (Cookies.get("cookie_consent"))
      Cookies.set("profile_image", imageUrl, { expires: 7 });
    return { imageUrl, error: null };
  } catch {
    return { imageUrl: null, error: "Failed to generate image" };
  }
};

export const syncProfileData = async (
  token?: string
): Promise<GenerateProfileResponse> => {
  return generateProfileImage(token);
};

export const hasCookieConsent = (): boolean => !!Cookies.get("cookie_consent");
export const setCookieConsent = (days = 365): void =>
  void Cookies.set("cookie_consent", "true", { expires: days });
export const getSavedProfileImage = (): string | null =>
  Cookies.get("profile_image") || null;
