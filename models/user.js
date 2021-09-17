const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('user', userSchema);