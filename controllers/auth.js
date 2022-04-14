const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(500).json({success:false, message: 'Validation failed!'});
  }
  User.findOne({email: req.body.email})
    .then(userDoc => {
        if(userDoc){
            return res.status(409).json({success:false, message:'Email already exists'});
        }
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
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
                res.status(201).json({name:savedUser.name, email: savedUser.email});
            })
    })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });  
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
        .then(userData => {
            if(!userData){
                return res.status(404).json({success: false, message:'User does not exist!'});
            }   
            loadedUser = userData;
            return bcrypt.compare(password, userData.password)
            .then(isEqual => {
                if(!isEqual){
                    return res.status(40).json({success: false, message:'Wrong password!'});
                }
                const token = jwt.sign({
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                }, 'somesupersecretsecret', {expiresIn: '1h'});
                console.log('User signed in!');
                res.status(202).send({
                    token: token,
                    userId: loadedUser._id.toString()
                });
            })
            .catch(err => {
                console.log(err);
            });
        })
}