const mongoose = require("mongoose");

const ourSpecialitySchema = new mongoose.Schema(
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
    // franchise: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "franchise"
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ourSpeciality", ourSpecialitySchema);
