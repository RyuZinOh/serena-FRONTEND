import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const settingsApi = {
  // Get profile picture
  getProfilePicture: async (token: string): Promise<Blob> => {
    const response = await axios.get(`${API_BASE_URL}/user/mypfp`, {
      headers: { Authorization: token },
      responseType: "blob",
    });
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File, token: string): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API_BASE_URL}/user/uploadpfp`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete profile picture
  deleteProfilePicture: async (token: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/user/deletepfp`, {
      headers: { Authorization: token },
    });
  },
};
