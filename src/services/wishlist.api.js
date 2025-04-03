import http from "@/config/axios.config";

export const wishlistApi = {
  getWishlist: async (user) => {
    try {
      const response = await http.get("/api/wishlist", {
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
      const response = await http.post(`/api/wishlist/add/${productId}`, {
        user: user,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return null;
    }
  },
  removeFromWishlist: async (user, productId) => {
    try {
      const response = await http.delete(`/api/wishlist/remove/${productId}`, {
        data: { user: user },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return null;
    }
  },
  checkIsWishlist: async (user, productId) => {
    console.log(user, productId);
    try {
      const response = await http.get(`/api/wishlist/${user}/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error checking wishlist:", error);
      return null;
    }
  },
};
