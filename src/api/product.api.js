export const productApi = {
  getAllProducts: async (params) => {
    try {
      fetch(`http://localhost:5001/api/products${params ? `?${params}` : ""}`)
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
};
