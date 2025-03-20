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

const getArticlesGroupByTag = async(req, res) => {

    try {
        const articles = await Article.aggregate([{
                $lookup: {
                    from: "tags", // The name of the tags collection
                    localField: "tag", // The field in the articles collection
                    foreignField: "_id", // The field in the tags collection
                    as: "tagInfo",
                },
            },
            {
                $unwind: "$tagInfo", // Unwind the tagInfo array
            },
            {
                $lookup: {
                    from: "users", // The name of the authors collection
                    localField: "author", // The field in the articles collection
                    foreignField: "_id", // The field in the authors collection
                    as: "authorInfo",
                },
            },
            {
                $unwind: "$authorInfo", // Unwind the authorInfo array
            },
            {
                $group: {
                    _id: "$tagInfo.name", // Group by tag name
                    articles: {
                        $push: {
                            title: "$title",
                            content: "$content",
                            author: "$authorInfo.name",
                            slug: "$slug",
                            createdAt: "$createdAt",
                        },
                    }, // Push the article details into an array
                },
            },
            {
                $project: {
                    tag: "$_id",
                    articles: 1,
                    _id: 0,
                },
            },
        ]);

        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getArticles,
    getArticlesGroupByTag,
};