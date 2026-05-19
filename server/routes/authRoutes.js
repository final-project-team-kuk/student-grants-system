const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const registerValidation = require("../middleware/registerValidation");
const loginValidation = require("../middleware/loginValidation");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;