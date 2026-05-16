const express = require('express');
const router = express.Router();
const { getRequestStatus, getCurrentRequestStatus } = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/test', (req, res) => res.send('Test route works'));
router.get('/requests/status/current', authMiddleware, getCurrentRequestStatus);
router.get('/requests/status/:userId', getRequestStatus);

module.exports = router;