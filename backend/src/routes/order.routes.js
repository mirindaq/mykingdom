const router = require("express").Router();
const {
  getOrders,
  getOrder,
  createOrder,
  getUserOrders,
} = require("../controllers/order.controller");

// Base route: /api/orders
router.get("/", getOrders);
router.get("/user", getUserOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);

module.exports = router;
