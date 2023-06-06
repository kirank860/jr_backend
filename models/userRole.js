const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema({
  displayName: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("UserRole", UserRoleSchema);
