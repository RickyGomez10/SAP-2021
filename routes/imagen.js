const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const imagenSchema = require('../models/imagen');
const { response } = require('../app');

router.get('/', function(req, res, next){
    res.send('estamos en la pagina de imagen');
})
router.post('/insertar', function(req, res, next) {

  conn.connectDB().then(()=>{
    
    imagenSchema({nombre: 'pruebita'}).save()
    .then(doc =>{
      console.log

      conn.closeDB();
    })
    .catch(err => console.log(err));

  }).catch((err)=>{
    console.log(err);
  });
  
});

module.exports = router;