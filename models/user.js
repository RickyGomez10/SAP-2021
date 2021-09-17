const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('user', userSchema);