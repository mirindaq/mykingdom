const {
  getArticles,
  getArticleByTag,
} = require("../controllers/article.controller");

const router = require("express").Router();
// /api/articles
// Base route: /api/articles
router.get("/", getArticles);
router.get("/get-by-tag/:tag", getArticleByTag);

module.exports = router;
