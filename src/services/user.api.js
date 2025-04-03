import http from "@/config/axios.config";

export const userApi = {
  updateUserAddress: async (id, address) => {
    try {
      const response = await http.put(
        `/api/users/${id}/address`,
        { address },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user address:", error);
      return null;
    }
  },
};