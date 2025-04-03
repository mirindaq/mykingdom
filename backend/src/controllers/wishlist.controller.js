const Wishlist = require("../models/wishlist.model");
const mongoose = require("mongoose");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.query.user }).populate(
      "products",
    );

    if (!wishlist) {
      const newWishlist = new Wishlist({ user: req.query.user, products: [] });
      await newWishlist.save();
      return res.json(newWishlist);
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.body.user });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.body.user,
        products: [req.params.productId],
      });
    } else if (!wishlist.products.includes(req.params.productId)) {
      wishlist.products.push(req.params.productId);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  console.log(req.body);
  try {
    const wishlist = await Wishlist.findOne({ user: req.body.user });
    console.log(wishlist);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (productId) => productId.toString() !== req.params.productId,
    );

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkIsWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.user }).populate(
      "products",
      "_id",
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const productId = req.params.productId;

    const isInWishlist = wishlist.products.some(
      (product) => {
        return product._id.toString() == productId.toString();
      },
    );

    if (isInWishlist) {
      return res.status(200).json({ isWishlist: true });
    }

    return res.status(200).json({ isWishlist: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkIsWishlist,
};
