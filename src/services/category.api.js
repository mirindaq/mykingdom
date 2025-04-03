import http from "@/config/axios.config";

export const categoryApi = {
  getAllCategories: async () => {
    try {
      const response = await http.get("/api/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
};

