const mongoose = require("mongoose");

const SiteIdentitySchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
    },
    tagLine: {
      type: String,
    },
    siteFavIcon: {
      type: String,
    },
    logo: {
      type: String,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("siteIdentity", SiteIdentitySchema);
