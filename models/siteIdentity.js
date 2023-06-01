const mongoose = require("mongoose");

const SiteIdentitySchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      required: true,
    },
    tagLine: {
      type: String,
      required: true,
    },
    siteFavIcon: {
      type: String,
      required: true,
    },
    logo: {
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

module.exports = mongoose.model("siteIdentity", SiteIdentitySchema);
