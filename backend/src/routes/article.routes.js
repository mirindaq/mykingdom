const router = require("express").Router();
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory,
} = require("../controllers/article.controller");

// Base route: /api/articles
router.get("/", getArticles);
router.get("/category/:categoryId", getArticlesByCategory);
router.get("/:id", getArticle);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
