const Order = require("../models/order.model");

const getOrders = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.min(50, Math.max(1, parseInt(limit) || 12));
  const skip = (validatedPage - 1) * validatedLimit;
  try {
    const orders = await Order.find()
      .populate("user", "name")
      .populate("items.product", "name price image_url slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(validatedLimit)
      .lean();

    const total = await Order.countDocuments();

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page: validatedPage,
        limit: validatedLimit,
        totalPages: Math.ceil(total / validatedLimit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate("items.product", "name price image_url slug");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      status: "pending",
      createdAt: Date.now(),
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.min(50, Math.max(1, parseInt(limit) || 2));
  const skip = (validatedPage - 1) * validatedLimit;
  try {
    const orders = await Order.find({ user: req.params.user })
      .populate("items.product", "name price image_url slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(validatedLimit)
      .lean();
    const total = await Order.countDocuments({ user: req.params.user });
    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page: validatedPage,
        limit: validatedLimit,
        totalPages: Math.ceil(total / validatedLimit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  getUserOrders,
};
