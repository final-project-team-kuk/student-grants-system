const express = require('express');
const router  = express.Router();

const { register, login }                 = require('../controllers/authController.js');
const { validateRegister, validateLogin } = require('../middleware/authValidation.js');

router.post('/register', validateRegister, register);
router.post('/login',    validateLogin,    login);

module.exports = router;
