const Brand = require("../models/brand.model");
const Product = require("../models/product.model");

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrand = async (req, res) => {
  // :slug -> req.params
  // req.query
  // req.body
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const savedBrand = await brand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    // Also update products that reference this brand
    await Product.updateMany(
      { brand: req.params.id },
      { $unset: { brand: "" } },
    );
    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrandProducts = async (req, res) => {
  try {
    const products = await Product.find({ brand: req.params.id }).populate(
      "category",
      "name",
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandProducts,
};
