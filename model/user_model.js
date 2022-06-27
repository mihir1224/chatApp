const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: String,
  name: String,
  isOnline: Boolean,
});
module.exports = mongoose.model("user", userSchema);
