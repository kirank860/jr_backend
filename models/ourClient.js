const mongoose = require("mongoose");

const OurClientSchema = new mongoose.Schema(
  {
    clientLogo: {
      type: String,
    },
    clientUrl: {
      type: String,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ourClient", OurClientSchema);
