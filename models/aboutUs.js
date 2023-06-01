const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
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
    history: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    // visionImage: {
    //   type: String,
    //   required: true,
    // },
    mission: {
      type: String,
      required: true,
    },
    // missionImage: {
    //   type: String,
    //   required: true,
    // },
    featuresList: {
        type: String,
        required: true,
    },
    // FeaturesImage: {
    //     type: String,
    //     required: true,
    // },
    franchise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("aboutUs", AboutUsSchema);
