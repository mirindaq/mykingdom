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
  getUserOrders: async (user) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/orders/user/${user}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/orders/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return null;
    }
  },
};
