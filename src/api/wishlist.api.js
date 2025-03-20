import axios from "axios";

export const wishlistApi = {
  getWishlist: async (user) => {
    try {
      const response = await axios.get("http://localhost:5001/api/wishlist", {
        params: { user },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  },

  addToWishlist: async (user, productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/wishlist/add/${productId}`,
        {
          user: user,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return null;
    }
  },
  removeFromWishlist: async (user, productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/wishlist/remove/${productId}`,
        {
          data: { user: user },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return null;
    }
  },
};
