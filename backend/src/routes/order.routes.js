const router = require("express").Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  getUserOrders,
} = require("../controllers/order.controller");

// Base route: /api/orders
router.get("/", getOrders);
router.get("/user/:user", getUserOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);

module.exports = router;
