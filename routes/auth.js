const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.email;
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                name: name,
                password: hashedPw,
                email: email
            });
            user.save()
                .then(savedUser => {
                    console.log('User created!');
                    res.status(200).send(savedUser);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });    
});

router.post('/login', (req, res) => {

})

module.exports = router;
