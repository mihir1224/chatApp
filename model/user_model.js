const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: String,
  name: String,
  isOnline: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user", userSchema);
