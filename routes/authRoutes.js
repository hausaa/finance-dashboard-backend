const express = require("express");
const router = express.Router();

const { register, login} = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validator/auth-validator");
const { validate } = require("../middlewares/validate");

router.post(
"/register",
registerValidation,
validate,
register
);

router.post(
"/login",
loginValidation,
validate,
login
);
module.exports = router;