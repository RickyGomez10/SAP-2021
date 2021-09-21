const mongoose = require('mongoose');

const propiedadSchema = mongoose.Schema({
    direccion: String,
    propietario: String
    
});

module.exports = mongoose.model('propiedad', propiedadSchema);