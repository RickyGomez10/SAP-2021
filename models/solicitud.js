const mongoose = require('mongoose');
const propiedad = require('./propiedad')
const perito = require('./user')

const solicitudSchema = mongoose.Schema({
    dui: String,
    nombre: String,
    telefono: String,
    correo: String,
    Aceptado: Boolean,
    Propiedad: mongoose.Schema.Types.ObjectId,
    perito: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('solicitud', solicitudSchema);