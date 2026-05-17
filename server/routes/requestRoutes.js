const express = require('express');
const router = express.Router();
const { getAllRequests, getRequestById, updateRequestStatus } = require('../controllers/requestController');

router.get('/requests', getAllRequests);
router.get('/requests/:id', getRequestById);
router.patch('/requests/:id/status', updateRequestStatus);

module.exports = router;
