const express = require('express');
const router = express.Router();
const { getAllRequests, getRequestById, updateRequestStatus, updateRequestEducation } = require('../controllers/requestController');

router.get('/requests', getAllRequests);
router.get('/requests/:id', getRequestById);
router.patch('/requests/:id/status', updateRequestStatus);
router.patch('/requests/:id/education', updateRequestEducation);

module.exports = router;
