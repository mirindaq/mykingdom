const Article = require("../models/article.model");
const Tag = require("../models/tag.model");

const getArticles = async(req, res) => {
    try {
        const articles = await Article.find()
            .populate("author", "name")
            .populate("tag", "name");
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArticleByTag = async(req, res) => {
    try {
        const articles = await Article.find({ tag: req.params.tag })
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