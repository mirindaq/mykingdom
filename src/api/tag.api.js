import axios from "axios";

export const tagApi = {
    getAllTag: async() => {
        try {
            const response = await axios.get("http://localhost:5001/api/tags");
            return response.data;
        } catch (error) {
            console.error("Error fetching articles:", error);
            return [];
        }
    }
};