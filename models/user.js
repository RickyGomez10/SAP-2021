const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: String,
    password: String,
    rol: String,
    nombres: String,
    apellidos: String,
    correo: String,
    numregistro: String
});

module.exports = mongoose.model('user', userSchema);