import http from "@/config/axios.config";


export const brandApi = {
  getAllBrands: async () => {
    try {
      const response = await http.get("/api/brands");
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      return [];
    }
  },
};
