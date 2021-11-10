const mongoose = require('mongoose');

const plantillaSchema = mongoose.Schema({
    nombre: String,
    contenido: String,
});

module.exports = mongoose.model('plantilla', plantillaSchema);