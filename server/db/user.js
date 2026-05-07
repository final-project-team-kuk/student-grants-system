const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nationalId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);