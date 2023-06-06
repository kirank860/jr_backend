const mongoose = require("mongoose");

const PostManagementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    content: {
      type: String,
    },
    date: {
      type: Date,
    },
    featuredImage: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postCategory"
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("postManagement", PostManagementSchema);
