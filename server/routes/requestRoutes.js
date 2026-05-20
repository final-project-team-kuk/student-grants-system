const express = require('express');
const router = express.Router();
const { create, read, readOne, update, updateStatus, updateEducation, remove, getRequestStatus } = require('../controllers/requestController');

router.post('/', create);
router.get('/', read);
router.get('/:id', readOne);
router.put('/:id', update);
router.patch('/:id/status', updateStatus);
router.patch('/:id/education', updateEducation);
router.delete('/:id', remove);
router.get('/user/:userId', getRequestStatus);

module.exports = router;
