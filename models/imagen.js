const mongoose = require('mongoose');

const imagenSchema = mongoose.Schema({
    nombre: String,
    tipo: Number,
    avaluo: mongoose.Schema.Types.ObjectId    
});

module.exports = mongoose.model('imagen', imagenSchema);