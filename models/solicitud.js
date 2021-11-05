const mongoose = require('mongoose');

const solicitudSchema = mongoose.Schema({
    dui: String,
    nombres: String,
    apellidos: String,
    telefono: String,
    correo: String,
    direccion1: String,
    direccion2: String,
    puntosReferencia: String,
    pais: String,
    ciudad: String,
    avaluoCompletado: Boolean,
    avaluoSimple: Object,
    perito: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('solicitud', solicitudSchema);