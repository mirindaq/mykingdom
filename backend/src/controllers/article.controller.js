const Article = require("../models/article.model");
const Tag = require("../models/tag.model");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "name")
      .populate("tag", "name");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleByTag = async (req, res) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.tag });
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    const articles = await Article.find({ tag: tag._id })
      .populate("author", "name")
      .populate("tag", "name");

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleByTag,
};
