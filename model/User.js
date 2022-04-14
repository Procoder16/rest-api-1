const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
       type: String,
       required: true,
       min: 6,
       max: 255 
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);