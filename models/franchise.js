const mongoose = require("mongoose");

const FranchiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location"
    },
    website: {
      type: String,
    },
    email: {
      type: String,
    },
    primaryNumber: {
      type: String,
    },
    secondaryNumber: {
      type: String,
    },
    remarks: {
      type: String,
    },
    subscriptionStartDate: {
      type: Date,
    },
    subscriptionEndDate: {
      type: Date,
    },
    franchiseImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("franchise", FranchiseSchema);
