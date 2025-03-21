import axios from "axios";

export const addressApi = {
  getAllProvinces: async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/p");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  getAllDistricts: async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/d");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
  getAllWards: async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/w");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
};

