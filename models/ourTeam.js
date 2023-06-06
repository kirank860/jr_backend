const mongoose = require("mongoose");

const OurTeamSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
    },
    groupTitle: {
      type: String,
    },
    groupSubTitle: {
      type: String,
    },
    name: {
      type: String,
    },
    position: {
      type: String,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
    },
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

module.exports = mongoose.model("ourTeam", OurTeamSchema);
