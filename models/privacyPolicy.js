const mongoose = require("mongoose");

const PrivacyPolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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

module.exports = mongoose.model("privacyPolicy", PrivacyPolicySchema);
