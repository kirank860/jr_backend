const mongoose = require("mongoose");

const PostCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("postCategory", PostCategorySchema);
