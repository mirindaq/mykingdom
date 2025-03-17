const {
  getBrands,
  getBrand,
  getBrandProducts,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");

const router = require("express").Router();

// Base route: /api/brands
router.get("/", getBrands);
router.get("/:id", getBrand);
router.get("/:id/products", getBrandProducts);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
