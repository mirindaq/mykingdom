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
const searchArticles = async (req, res) => {
  try {
    const { tag, title } = req.query;
    const query = {};


    if (tag?.trim()) {
      const foundTag = await Tag.findOne({ slug: tag });
      if (!foundTag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      query["tag"] = foundTag._id;
    }

    if (title?.trim()) {
      query.title = { $regex: new RegExp(title, "i") }; 
    }

    const articles = await Article.find(query)
      .populate("author", "name")
      .populate("tag", "name slug");

    res.json(articles);
  } catch (error) {
    console.error("Search Articles Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getArticles,
  getArticleByTag,
  searchArticles,
};
