const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema(
  {
    instaId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    twitterId: {
      type: String,
    },
    linkedinId: {
      type: String,
    },
    pinterestId: {
      type: String,
    },
    youtubeId: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("socialMedia", SocialMediaSchema);
