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
    getArticlesBySlugTag: async(slug) => {
        try {
            const response = await axios.get(
                `http://localhost:5001/api/articles/get-by-tag/${slug}`,
            );
            return response.data;
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            return null;
        }
    },
};