const router = require("express").Router();
const {
  getAllProducts,
  getProduct,
  searchProductsByName,
} = require("../controllers/product.controller");

// Base route with filtering, sorting and pagination
router.get("/", getAllProducts);

router.get("/searchByName", searchProductsByName);
router.get("/:slug", getProduct);

module.exports = router;
