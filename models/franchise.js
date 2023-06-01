const mongoose = require("mongoose");

const FranchiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
    },
    primaryColour: {
      type: String,
    },
    secondaryColour: {
      type: String,
    },
    owner: {
      type: String,
    },
    franchiseImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("franchise", FranchiseSchema);
