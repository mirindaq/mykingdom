import axios from "axios";

export const categoryApi = {
  getAllCategories: async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
};

