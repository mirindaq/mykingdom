import http from "@/config/axios.config";

export const articleApi = {
  getAllArticles: async () => {
    try {
      const response = await http.get("/api/articles");
      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  },
  getArticlesBySlugTag: async (slug) => {
    try {
      const response = await http.get(`/api/articles/get-by-tag/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return null;
    }
  },
  searchArticles: async (tag, title) => {
    try {
      const response = await http.get(
        `/api/articles/search?tag=${tag}&title=${title}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error searching articles:", error);
      return [];
    }
  },
};
