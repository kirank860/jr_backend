const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    sequence: {
      type: Number,
    },
    icon: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
    },
    element: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("menu", MenuSchema);
