const router = require("express").Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkIsWishlist,
} = require("../controllers/wishlist.controller");

// Base route: /api/wishlist
router.get("/", getWishlist);
router.get("/:user/:productId", checkIsWishlist);  
router.post("/add/:productId", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);

module.exports = router;
