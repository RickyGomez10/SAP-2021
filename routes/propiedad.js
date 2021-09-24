const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const propiedadSchema= require('../models/propiedad');


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





module.exports = router;