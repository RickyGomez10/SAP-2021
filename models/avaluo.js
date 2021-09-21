const mongoose = require('mongoose');


const avaluoSchema = mongoose.Schema({
    modelo: Object,
    imagen: mongoose.Schema.Types.ObjectId,
    propiedad: mongoose.Schema.Types.ObjectId,
    perito: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('avaluo', avaluoSchema);