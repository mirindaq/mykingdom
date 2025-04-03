import http from "@/config/axios.config";
import { toast } from "sonner";

export const authApi = {
  login: async (user) => {
    try {
      const response = await http.post(
        "/api/auth/login",
        {
          email: user.email,
          password: user.password,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  },
  register: async (user) => {
    try {
      const response = await http.post(
        "/api/auth/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email đã tồn tại");
      }
      console.error("Error registering:", error);
      return null;
    }
  },
};
