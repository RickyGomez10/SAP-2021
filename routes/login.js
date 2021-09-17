const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const Usuario = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Inicio de Sesión' });
});

router.post('/verificar', function(req, res, next) {
  var usuario = req.body.user;
  var contra = req.body.pass;

  conn.connectDB().then(()=>{
    
    Usuario.findOne({user: usuario})
    .exec()
    .then(doc =>{
      console.log(doc);
      if(doc != null){
        if(doc.password == contra){  
          res.json({ msg: 'Validación correcta' }).status(200);
        }else{
          res.json({ msg: 'Error de validación' }).status(401);
        }
      }else{
        res.json({ msg: 'Error de validación' }).status(401);
      }

      conn.closeDB();
    })
    .catch(err => console.log(err));

  }).catch((err)=>{
    console.log(err);
  });
  
});

module.exports = router;