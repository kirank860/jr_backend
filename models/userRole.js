const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserRole", UserRoleSchema);
