const router = require("express").Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
} = require("../controllers/category.controller");

// Base route: /api/categories
router.get("/", getCategories);
router.get("/:slug", getCategory);
router.get("/:id/products", getCategoryProducts);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
