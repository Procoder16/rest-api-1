const router = require("express").Router();
const authControllers = require('../controllers/auth');
const User = require("../model/User");
const { body } = require('express-validator');

router.post("/register",[
    body('email').isEmail().isLength({min: 6}).withMessage('Please enter a valid email!')
    .custom((value, { req }) => {
        return User.findOne({email: value})
               .then(userDoc => {
                   if(userDoc){
                       return Promise.reject('Email already exists');
                   }
               });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min: 8}),
    body('name').trim().not().isEmpty()
], authControllers.register);

router.post("/login");

module.exports = router;
