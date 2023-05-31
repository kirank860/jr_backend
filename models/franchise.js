const mongoose = require("mongoose");

const FranchiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    primaryColour: {
      type: String,
      required: true,
    },
    secondaryColour: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Franchise", FranchiseSchema);
