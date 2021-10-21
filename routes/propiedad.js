const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const propiedadSchema= require('../models/propiedad');
const propiedad = require('../models/propiedad');
var objectid = require('mongodb').ObjectId

router.get('/', function(req, res, next){
    res.render('propiedadForm');
})

router.post('/insertar', function(req, res, next) {
        let propiedad = {
            direccion: req.body.direccion,
            departamento: req.body.departamento,
            municipio: req.body.municipio,
            metroscuadrados:req.body.metros,
            propietario: req.body.propietario
        }

        conn.connectDB().then(()=>{
    
            propiedadSchema(propiedad).save()
            .then(doc =>{
              console.log
        
              conn.closeDB();
            })
            .catch(err => console.log(err));
        
          }).catch(err=> console.log(err) );
});

//buscar propiedad
router.get('/search', (req, res, next)=>{
  var id = req.body.propiedadid
  var o_id = new objectid(id)
  conn.connectDB().then(()=>{
    propiedadSchema.find({_id: o_id}).then(propiedad=>{
      res.status(200).json(propiedad);
      console.log('propiedad encontrada')
    }).catch(error=>
      console.log(error)
      )
  })

})

//buscar todas las propiedades
router.get('/search', (req, res, next)=>{
  conn.connectDB().then(()=>{
    propiedadSchema.find({_id: o_id}).then(propiedades=>{
      res.status(200).json(propiedades);
      console.log('propiedades encontradas')
    }).catch(error=>
      console.log(error)
      )
  })

})





module.exports = router;