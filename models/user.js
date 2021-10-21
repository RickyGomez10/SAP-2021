const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: String,
    password: String,
    rol: String,
    nombre: String,
    apellido: String,
    correo: String
});

module.exports = mongoose.model('user', userSchema);