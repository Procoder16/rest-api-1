const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(500).send('Validation failed!');
  }

  User.findOne({email: req.body.email})
    .then(userDoc => {
        if(userDoc){
            return res.status(500).send('Email already exists');
        }
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.email;
        bcrypt
            .hash(password, 12)
            .then((hashedPw) => {
                const user = new User({
                name: name,
                password: hashedPw,
                email: email,
            });
            user
            .save()
            .then((savedUser) => {
                console.log("User created!");
                res.status(200).send(savedUser);
            })
    })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });  
}