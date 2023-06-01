const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    productCategory: {
      type: String,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productCategory", ProductCategorySchema);
