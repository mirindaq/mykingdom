const Tag = require("../models/tag.model");

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTags,
};
