import http from "@/config/axios.config";

export const productApi = {
  getAllProducts: async (params) => {
    try {
      const response = await http.get(
        `/api/products?${params}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
  searchProductsByName: async (params) => {
    try {
      const response = await http.get(
        `/api/products/searchByName`,
        { params: params },
      );
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  },
  getProductBySlug: async (slug) => {
    try {
      const response = await http.get(
        `/api/products/${slug}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      return null;
    }
  },
};
