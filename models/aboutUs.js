const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    aboutusImage: {
      type: String,
    },
    history: {
      type: String,
    },
    vision: {
      type: String,
    },
    // visionImage: {
    //   type: String,
    // },
    mission: {
      type: String,
    },
    // missionImage: {
    //   type: String,
    // },
    featuresList: {
      type: String,
    },
    // FeaturesImage: {
    //   type: String,
    // },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("aboutUs", AboutUsSchema);
