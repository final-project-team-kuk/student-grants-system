const mongoose = require('mongoose');

const AdminRequestSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    id: { type: String, required: true }, // תואם ל"חיפוש לפי ת.ז"
    city: { type: String, required: true },      // תואם ל"עיר מגורים"
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now } // תואם ל"מתאריך / עד תאריך"
});

module.exports = mongoose.model('AdminRequest', AdminRequestSchema);