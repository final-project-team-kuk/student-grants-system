const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

  // ✅ userId פעם אחת בלבד, עם index
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  userSnapshot: {
    nationalId: String,
    firstName: String,
    lastName: String
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    index: true
  },

  createdAt: { type: Date, default: Date.now },

  personal: {
    birthDate: { type: Date, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: String,
    mobile: { type: String, required: true }
  },

  family: {
    father: {
      id: { type: String, required: true },
      firstName: String,
      lastName: String
    },
    mother: {
      id: { type: String, required: true },
      firstName: String,
      lastName: String
    },
    siblings: [
      {
        id: String,
        firstName: String,
        lastName: String,
        birthDate: Date
      }
    ]
  },

  // ... שאר הסכמה נשארת כמו שיש
});

module.exports = mongoose.model("Request", requestSchema);