// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const {getCurrentRequestStatus,getRequestStatus } = require('../controllers/requestController');


// נתיב לקבלת הסטטוס (יתורגם ל- GET /api/requests/status)
router.get('/status/:userId', getRequestStatus);
router.get('/current-status', getCurrentRequestStatus);
//router.post('/submit', submitNewRequest);

// נתיב זמני ליצירת בקשה בבסיס הנתונים לצורך טסטים (POST /api/requests)
//router.post('/requests', createMockRequest);

module.exports = router;