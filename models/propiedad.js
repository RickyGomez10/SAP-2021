const mongoose = require('mongoose');

const propiedadSchema = mongoose.Schema({
    direccion: String,
    departamento: String,
    municipio: String,
    metroscuadrados:String,
    propietario: String
});

module.exports = mongoose.model('propiedad', propiedadSchema);