const mongoose = require("mongoose");

const OurClientSchema = new mongoose.Schema(
  {
    clientLogo: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    // franchise: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "franchise"
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ourClient", OurClientSchema);
