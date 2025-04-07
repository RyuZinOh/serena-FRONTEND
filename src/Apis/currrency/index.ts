import axios from "axios";

interface CurrencyData {
  coin_name: string;
  coin_value: number;
}

export const getCurrency = async (
  userId: string,
  token: string
): Promise<CurrencyData> => {
  try {
    const response = await axios.get<CurrencyData>(
      `${import.meta.env.VITE_API_BASE_URL}/currency/${userId}/get`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.status === 401
          ? "Session expired"
          : "Failed to fetch currency"
      );
    }
    throw new Error("Failed to fetch currency");
  }
};
