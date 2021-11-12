const mongoose = require('mongoose');

const informeSchema = mongoose.Schema({
    nombre: String,
    fuente: mongoose.Schema.Types.ObjectId,
    plantilla: mongoose.Schema.Types.ObjectId,
    perito: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('informe', informeSchema);