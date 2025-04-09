import axios from "axios";
import Cookies from "js-cookie";

// generate_profile_image
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

//card section
export interface Card {
  url: string;
  name: string;
  description: string;
  price: number;
}

export interface CardsResponse {
  cards: Card[];
  error?: string;
}

export interface CardPurchaseResponse {
  success: boolean;
  message?: string;
}
//fetching cards and buying cards
export const fetchCards = async (): Promise<CardsResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/kamehameha/card`
    );
    return { cards: response.data.cards };
  } catch (error) {
    return {
      cards: [],
      error: axios.isAxiosError(error)
        ? error.message
        : "Failed to fetch cards",
    };
  }
};

export const buyCard = async (
  cardName: string,
  token: string
): Promise<CardPurchaseResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/kamehameha/buy_card/${cardName}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Purchase failed",
    };
  }
};

//background section
export interface BackgroundImage {
  url: string;
  name: string;
  description: string;
  price: string;
}

interface BackgroundsResponse {
  backgrounds: BackgroundImage[];
  error?: string;
}

interface PurchaseResponse {
  success: boolean;
  message?: string;
}
//fetching backgrounds and buying backgrounds
export const fetchBackgrounds = async (): Promise<BackgroundsResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/kamehameha/background`
    );
    return { backgrounds: response.data.backgrounds };
  } catch (error) {
    return {
      backgrounds: [],
      error: axios.isAxiosError(error)
        ? error.message
        : "Failed to fetch backgrounds",
    };
  }
};

export const buyBackground = async (
  backgroundName: string,
  token: string
): Promise<PurchaseResponse> => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/kamehameha/buy_background/${backgroundName}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Purchase failed",
    };
  }
};



// title section
export interface Title {
  name: string;
  price: number;
}

export interface TitlesResponse {
  titles: Title[];
  error?: string;
}

export interface TitlePurchaseResponse {
  success: boolean;
  message?: string;
}

//fetching titles and buying titles
export const fetchTitles = async (): Promise<TitlesResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/kamehameha/title`
    );
    
    const titles = response.data?.titles
      ? Object.values(response.data.titles).map((value) => {
          const [name, price] = value as [string, number];
          return { name, price };
        })
      : [];
    
    return { titles };
  } catch (error) {
    return {
      titles: [],
      error: axios.isAxiosError(error)
        ? error.message
        : "Failed to fetch titles",
    };
  }
};
export const buyTitle = async (
  titleIndex: number,
  token: string
): Promise<TitlePurchaseResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/kamehameha/buy_title/${titleIndex + 1}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Purchase failed",
    };
  }
};


//consensts
export const hasCookieConsent = (): boolean => !!Cookies.get("cookie_consent");
export const setCookieConsent = (days = 365): void =>
  void Cookies.set("cookie_consent", "true", { expires: days });
//image getter
export const getSavedProfileImage = (): string | null =>
  Cookies.get("profile_image") || null;
