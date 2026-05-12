const express = require('express');
const router = express.Router();
const AdminRequest = require('../models/AdminRequest');

// נתיב לחיפוש וסינון בקשות
router.get('/search', async (req, res) => {
    try {
        const { id, city, startDate, endDate } = req.query;
        let query = {};

        // אם המשתמש הזין ת.ז
        if (id) query.id = id;
        
        // אם המשתמש הזין עיר
        if (city) query.city = new RegExp(city, 'i'); // 'i' אומר שלא משנה אם זה אותיות גדולות/קטנות

        // אם המשתמש בחר טווח תאריכים
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate); // גדול או שווה ל...
            if (endDate) query.createdAt.$lte = new Date(endDate);     // קטן או שווה ל...
        }

        const results = await AdminRequest.find(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;