import axios from "axios";

export const productApi = {
  getAllProducts: async (params) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/products?${params}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
};
