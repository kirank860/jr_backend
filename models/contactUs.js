const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
  {
    pageTitle: {
      type: String,
    },
    pageSubTitle: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    contactusImage: {
      type: String,
    },
    primaryAddress: {
      type: String,
    },
    secondaryAddress: {
      type: String,
    },
    primaryPhone: {
      type: String,
    },
    secondaryPhone: {
      type: String,
    },
    primaryEmail: {
      type: String,
    },
    secondaryEmail: {
      type: String,
    },
    locationUrl: {
      type: String,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contactUs", ContactUsSchema);
