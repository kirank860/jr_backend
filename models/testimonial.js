const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    message: {
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

module.exports = mongoose.model("testimonial", TestimonialSchema);
