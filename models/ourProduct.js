const mongoose = require("mongoose");

const OurProductSchema = new mongoose.Schema(
  {
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productCategory"
    },
    productSequence: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    offerPrice: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ourProduct", OurProductSchema);
