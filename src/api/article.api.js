import axios from "axios";

export const articleApi = {
  getAllArticles: async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/articles");
      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  },
  getArticlesGroupByTag: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/articles/group-by-tag",
      );
      return response.data;

      // const response = await fetch(
      //   "http://localhost:5001/api/articles/group-by-tag",
      // );
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error("Error fetching articles by tag:", error);
      return [];
    }
  },
};
