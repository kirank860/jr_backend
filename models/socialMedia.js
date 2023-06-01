const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema(
  {
    instaId: {
      type: String,
      required: true,
    },
    facebookId: {
      type: String,
      required: true,
    },
    twitterId: {
      type: String,
      required: true,
    },
    linkedinId: {
      type: String,
      required: true,
    },
    pinterestId: {
      type: String,
      required: true,
    },
    youtubeId: {
      type: String,
      required: true,
    },
    whatsapp: {
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

module.exports = mongoose.model("socialMedia", SocialMediaSchema);
