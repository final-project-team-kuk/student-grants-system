const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

  // קשר למשתמש
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // סטטוס ותאריך
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  // פרטים אישיים
  personal: {
    birthDate: Date,
    city: String,
    address: String,
    phone: String,
    mobile: String
  },

  // פרטי משפחה
  family: {
    father: {
      id: String,
      name: String
    },
    mother: {
      id: String,
      name: String
    },
    siblings: [
      {
        id: String,
        name: String,
        birthDate: Date
      }
    ]
  },

  // פרטי לימודים
  education: {
    institution: String,
    field: String,
    years: Number,
    tuition: Number
  },

  // פרטי בנק
  bank: {
    bankName: String,
    branch: String,
    accountNumber: String,
    ownerId: String
  },

  // קבצים
  files: {
    idDocs: [String],
    studyApproval: String,
    bankApproval: String
  }

});

module.exports = mongoose.model("Request", requestSchema);