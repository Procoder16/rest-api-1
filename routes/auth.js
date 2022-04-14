const router = require("express").Router();
const authControllers = require('../controllers/auth');
const User = require("../model/User");
const { body } = require('express-validator');

router.post("/register",
[
    body('email').isEmail().isLength({min: 6}).withMessage('Please enter a valid email!')
    .normalizeEmail(),
    body('password').trim().isLength({min: 8}).withMessage('Password length must be of minimum 8!'),
    body('name').trim().not().isEmpty()
],
 authControllers.register);

router.post("/login", authControllers.login);

module.exports = router;