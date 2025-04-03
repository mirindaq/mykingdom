import http from "@/config/axios.config";

export const tagApi = {
    getAllTag: async() => {
        try {
            const response = await http.get("/api/tags");
            return response.data;
        } catch (error) {
            console.error("Error fetching articles:", error);
            return [];
        }
    }
};