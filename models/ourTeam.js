const mongoose = require("mongoose");

const OurTeamSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    groupTitle: {
      type: String,
      required: true,
    },
    groupSubTitle: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("ourTeam", OurTeamSchema);
