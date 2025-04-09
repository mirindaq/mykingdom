const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Brand = require("../models/brand.model");

const getCategoryIdsBySlugs = async (slugs) => {
  const categories = await Category.find({ slug: { $in: slugs } }).select(
    "_id",
  );
  return categories.map((category) => category._id);
};

const getBrandIdsBySlugs = async (slugs) => {
  const brands = await Brand.find({ slug: { $in: slugs } }).select("_id");
  return brands.map((brand) => brand._id);
};

const getAllProducts = async (req, res) => {
  try {
    const {
      categories,
      brands,
      price_ranges,
      age_ranges,
      gender,
      sort = "createdAt",
      page = 1,
      limit = 12,
    } = req.query;

    const validatedPage = Math.max(1, parseInt(page) || 1);
    const validatedLimit = Math.min(50, Math.max(1, parseInt(limit) || 12));

    let query = {};
    const conditions = [];

    if (categories) {
      const categorySlugs = categories.split(",").filter(Boolean);
      if (categorySlugs.length > 0) {
        const categoryIds = await getCategoryIdsBySlugs(categorySlugs);
        conditions.push({ category: { $in: categoryIds } });
      }
    }

    if (brands) {
      const brandSlugs = brands.split(",").filter(Boolean);
      if (brandSlugs.length > 0) {
        const brandIds = await getBrandIdsBySlugs(brandSlugs);
        conditions.push({ brand: { $in: brandIds } });
      }
    }

    if (price_ranges) {
      const priceArray = price_ranges.split(",").filter(Boolean);
      if (priceArray.length > 0) {
        const priceConditions = priceArray.map((range) => {
          const [min, max] = range
            .split("-")
            .map((price) => parseInt(price.replace(/\D/g, "")));
          return max
            ? { price: { $gte: min, $lte: max } }
            : { price: { $gte: min } };
        });
        conditions.push({ $or: priceConditions });
      }
    }

    if (age_ranges) {
      const ageArray = age_ranges.split(",").filter(Boolean);
      if (ageArray.length > 0) {
        const ageRangeMap = {
          "0-12 tháng": [0, 1],
          "1-3 tuổi": [1, 3],
          "3-6 tuổi": [3, 6],
          "6-12 tuổi": [6, 12],
          "12 tuổi trở lên": [12, 100],
        };

        const ageConditions = ageArray
          .map((range) => ageRangeMap[range])
          .filter(Boolean)
          .map(([min, max]) => ({
            recommended_age: { $gte: min, $lte: max },
          }));

        if (ageConditions.length > 0) {
          conditions.push({ $or: ageConditions });
        }
      }
    }

    if (gender) {
      const genderArray = gender.split(",").filter(Boolean);
      if (genderArray.length > 0) {
        conditions.push({ gender: { $in: genderArray } });
      }
    }
    if (conditions.length > 0) {
      query.$and = conditions;
    }

    const sortConfig = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
      createdAt: { createdAt: -1 },
      discount: { discount: -1 },
    };

    const sortObj = sortConfig[sort] || sortConfig.createdAt;

    const skip = (validatedPage - 1) * validatedLimit;

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("category", "name slug")
        .populate("brand", "name slug")
        .sort(sortObj)
        .skip(skip)
        .limit(validatedLimit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return res.json({
      success: true,
      products,
      pagination: {
        total,
        page: validatedPage,
        limit: validatedLimit,
        totalPages: Math.ceil(total / validatedLimit),
      },
    });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "name slug")
      .populate("brand", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDiscountedProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const validatedPage = Math.max(1, parseInt(page) || 1);
    const validatedLimit = Math.min(50, Math.max(1, parseInt(limit) || 12));
    const skip = (validatedPage - 1) * validatedLimit;

    const [products, total] = await Promise.all([
      Product.find({ discount: { $gt: 0 } })
        .populate("category", "name slug")
        .populate("brand", "name slug")
        .sort({ discount: -1 })
        .skip(skip)
        .limit(validatedLimit)
        .lean(),
      Product.countDocuments({ discount: { $gt: 0 } }),
    ]);

    return res.json({
      success: true,
      products,
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

const searchProductsByName = async (req, res) => {
  const { page = 1, limit = 8, name } = req.query;
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.min(50, Math.max(1, parseInt(limit) || 12));
  const skip = (validatedPage - 1) * validatedLimit;

  const regex = new RegExp(name, "i");
  const [products, total] = await Promise.all([
    Product.find({ name: regex })
      .populate("category", "name slug")
      .populate("brand", "name slug")
      .sort({ discount: -1 })
      .skip(skip)
      .limit(validatedLimit)
      .lean(),
    Product.countDocuments({ name : regex}),
  ]);

  return res.json({
    success: true,
    products,
    pagination: {
      total,
      page: validatedPage,
      limit: validatedLimit,
      totalPages: Math.ceil(total / validatedLimit),
    },
  });
};

module.exports = {
  getAllProducts,
  getProduct,
  searchProductsByName,
  getDiscountedProducts,
};
