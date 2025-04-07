import axios from "axios";

export const addressApi = {
  getAllProvinces: async () => {
    try {
      const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
      return response.data.data; // Điều chỉnh theo cấu trúc response thực tế
    } catch (error) {
      console.error("Error fetching provinces:", error);
      return [];
    }
  },
  
  getDistrictsByProvince: async (provinceId) => {
    try {
      const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
      return response.data.data; // Điều chỉnh theo cấu trúc response thực tế
    } catch (error) {
      console.error("Error fetching districts:", error);
      return [];
    }
  },
  
  getWardsByDistrict: async (districtId) => {
    try {
      const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
      return response.data.data; // Điều chỉnh theo cấu trúc response thực tế
    } catch (error) {
      console.error("Error fetching wards:", error);
      return [];
    }
  },
};