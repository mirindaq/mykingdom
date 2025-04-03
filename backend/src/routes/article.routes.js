const {
  getArticles,
  getArticleByTag,
  searchArticles,
} = require("../controllers/article.controller");

const router = require("express").Router();
// /api/articles

router.get("/", getArticles);
router.get("/get-by-tag/:tag", getArticleByTag);
router.get("/search", searchArticles);

module.exports = router;
