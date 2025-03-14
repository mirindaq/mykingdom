const router = require("express").Router();
const {
  getAllProducts,
  getProduct,
  searchProducts,
} = require("../controllers/product.controller");

// Base route with filtering, sorting and pagination
router.get("/", getAllProducts);

router.get("/search", searchProducts);
router.get("/:slug", getProduct);

module.exports = router;
