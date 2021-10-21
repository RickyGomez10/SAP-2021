const mongoose = require('mongoose');

const imagenSchema = mongoose.Schema({
    nombre: String,
    tipo: Number
    
});

module.exports = mongoose.model('imagen', imagenSchema);