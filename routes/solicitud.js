const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const solicitudSchema= require('../models/solicitud');
const propiedadSchema = require('../models/propiedad');
const peritoSchema = require('../models/user');

router.get('/', function(req, res, next){
    conn.connectDB().then( async ()=>{
            var propiedades = await propiedadSchema.find();
            var peritos = await peritoSchema.find({rol:'perito'});


            res.render('solicitudForm', {per: peritos, prop: propiedades});
        }
    )

})

router.post('/insertar', function(req, res, next) {
    var solicitud = {dui: String,
        dui: req.body.dui,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        Aceptado: false,
        Propiedad: req.body.propiedad,
        perito: null,
    }

    conn.connectDB().then(()=>{
    
        solicitudSchema(solicitud).save()
        .then(doc =>{
          console.log
    
          conn.closeDB();
        })
        .catch(err => console.log(err));
    
      }).catch(err=> console.log(err) );
      
});





module.exports = router;