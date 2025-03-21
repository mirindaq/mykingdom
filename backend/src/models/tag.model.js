const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contentTag: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
