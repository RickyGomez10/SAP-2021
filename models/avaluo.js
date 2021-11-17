const mongoose = require('mongoose');


const avaluoSchema = mongoose.Schema({
    modelo: Object,
    //imagen: mongoose.Schema.Types.ObjectId, //Agregar un arreglo de IDS
    propiedad: mongoose.Schema.Types.ObjectId,
    perito: mongoose.Schema.Types.ObjectId,
    fecha: mongoose.Schema.Types.Date
});

module.exports = mongoose.model('avaluo', avaluoSchema);