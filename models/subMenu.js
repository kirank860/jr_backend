const mongoose = require("mongoose");

const SubMenuSchema = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    sequence: {
      type: Number,
    },
    menu: {
      type: mongoose.Schema.ObjectId,
      ref: "Menu",
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

module.exports = mongoose.model("SubMenu", SubMenuSchema);
