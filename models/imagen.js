const mongoose = require('mongoose');

const imagenSchema = mongoose.Schema({
    nombre: String,
    
});

module.exports = mongoose.model('imagen', imagenSchema);