import http from "@/config/axios.config";

export const orderApi = {
  createOrder: async (order) => {
    try {
      const response = await http.post(
        "/api/orders",
        order,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  },
  getUserOrders: async (user, page, limit) => {
    try {
      const response = await http.get(
        `/api/orders/user/${user}?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await http.get(
        `/api/orders/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return null;
    }
  },
};
