const mongoose = require("mongoose");

const OurProductSchema = new mongoose.Schema(
  {
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategory"
    },
    productSequence: {
      type: String,
    },
    productId: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
    offerPrice: {
      type: String,
    },
    brand: {
      type: String,
    },
    features: {
      type: String,
    },
    rating: {
      type: String,
    },
    productImage: {
      type: String,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ourProduct", OurProductSchema);
