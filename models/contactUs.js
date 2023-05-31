const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    primaryAddress: {
      type: String,
      required: true,
    },
    secondaryAddress: {
      type: String,
      required: true,
    },
    primaryPhone: {
      type: String,
      required: true,
    },
    secondaryPhone: {
      type: String,
      required: true,
    },
    primaryEmail: {
      type: String,
      required: true,
    },
    secondaryEmail: {
        type: String,
        required: true,
    },
    locationUrl: {
        type: String,
        required: true,
    },
    // franchise: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "franchise"
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contactUs", ContactUsSchema);
