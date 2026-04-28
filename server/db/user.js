const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Id: String,
  firstName: String,
  lastName: String,
  password: String,
  role: String
});

module.exports = mongoose.model("User", userSchema);