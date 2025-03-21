import axios from "axios";

export const orderApi = {
  createOrder: async (order) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/orders",
        order,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  },
};
