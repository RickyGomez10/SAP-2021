const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection');
const Usuario = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('perito/menu', { title: 'Inicio', contenido: 'home', user: req.cookies.username });
});
router.get('/addSchema', function(req, res, next) {
  res.render('perito/menu', { title: 'Añadir planos', contenido: 'addPlano', user: req.cookies.username });
});
router.get('/exportSchema', function(req, res, next) {
  res.render('perito/menu', { title: 'Exportar planos', contenido: 'exportPlano', user: req.cookies.username });
});
router.get('/templates', function(req, res, next) {
  res.render('perito/menu', { title: 'Plantillas previas', contenido: 'templates', user: req.cookies.username });
});
router.get('/listado', function(req, res, next) {
  Usuario.find({})
    .exec()
    .then(doc => {
      if (doc != null) {
        console.log(doc);
        res.render('perito/menu', { title: 'Plantillas previas', contenido: 'listaAvaluos', lista: doc, user: req.cookies.username });
      }else{
        res.render('perito/menu', { title: 'Plantillas previas', contenido: 'listaAvaluos', lista: null, user: req.cookies.username});
      }
    })
    .catch(err => console.log(err));
  
});


module.exports = router;
