const router = require("express").Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlist.controller");

// Base route: /api/wishlist
router.get("/", getWishlist);
router.post("/add/:productId", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.delete("/clear", clearWishlist);

module.exports = router;
