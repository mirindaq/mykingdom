import axios from "axios";

export const userApi = {
  updateUserAddress: async (id, address) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/${id}/address`,
        { address },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user address:", error);
      return null;
    }
  },
};