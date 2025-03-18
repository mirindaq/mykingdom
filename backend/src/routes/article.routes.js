const {
  getArticles,
  getArticlesGroupByTag,
} = require("../controllers/article.controller");

const router = require("express").Router();

// Base route: /api/articles
router.get("/", getArticles);
router.get("/group-by-tag", getArticlesGroupByTag);

module.exports = router;
