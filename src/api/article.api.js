import axios from "axios";

export const articleApi = {
    getAllArticles: async() => {
        try {
            const response = await axios.get("http://localhost:5001/api/articles");
            return response.data;
        } catch (error) {
            console.error("Error fetching articles:", error);
            return [];
        }
    },
    getArticlesByTag: async(tagId) => {
        try {
            const response = await axios.get(
                `http://localhost:5001/api/articles/get-by-tag/${tagId}`,
            );
            return response.data;
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            return null;
        }
    },
};