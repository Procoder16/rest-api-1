const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(500).send('Validation failed!');
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
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}