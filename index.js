const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import routes
const authRoutes = require('./routes/auth');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT)
    .then(result => {
        console.log('DB Connected!');
    })
    .catch(err => {
        console.log(err);
    });

//Middleware

app.use(express.json());

//Routes middlewares

app.use('/api/user', authRoutes);

app.listen(3000, () => {
    console.log('Server up and running!');
})