const router = require("express").Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  cancelOrder,
  getUserOrders,
} = require("../controllers/order.controller");

// Base route: /api/orders
router.get("/", getOrders);
router.get("/user", getUserOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.put("/:id/cancel", cancelOrder);

module.exports = router;
