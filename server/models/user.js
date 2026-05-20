<<<<<<< HEAD
// User.js — FIXED
=======
>>>>>>> 8945f0564f473df8147afe0475f4a03620868110
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
<<<<<<< HEAD
  lastName:  { type: String, required: true },
  idNumber:  { type: String, required: true, unique: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
=======
  lastName: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
>>>>>>> 8945f0564f473df8147afe0475f4a03620868110
