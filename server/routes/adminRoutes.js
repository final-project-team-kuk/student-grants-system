const express = require('express');const router = express.Router();
const Request = require('../models/requestModel');

router.get('/', async (req, res) => {
    try {
        const results = await Request.find({});
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { id, city, startDate, endDate } = req.query;
        let query = {};

        if (id) query['userSnapshot.nationalId'] = new RegExp(id, 'i');
        if (city) query['personal.city'] = new RegExp(city, 'i');

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const results = await Request.find(query);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;