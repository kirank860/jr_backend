const mongoose = require("mongoose");

const PostCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
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
