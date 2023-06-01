const mongoose = require("mongoose");

const ourSpecialitySchema = new mongoose.Schema(
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
    specialityImage: {
      type: String,
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "franchise"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ourSpeciality", ourSpecialitySchema);
