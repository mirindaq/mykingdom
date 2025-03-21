const { getTags } = require("../controllers/tag.controller");

const router = require("express").Router();

// Base route: /api/tags
router.get("/", getTags);

module.exports = router;