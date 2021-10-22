const express = require('express');
const router = express.Router();
const Usuario = require('../models/user');
const Propiedad = require('../models/propiedad');
const { PreconditionFailed } = require('http-errors');

router.get('/', function(req, res, next) {
  console.log(req.cookies.username);
  console.log('hola');
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
router.get('/avaluo', function(req, res, next) {
  res.render('perito/menu', { title: 'Avalúo', contenido: 'avaluo', user: req.cookies.username });
});
router.get('/buscar-propiedad', function(req, res, next) {
  res.render('perito/menu', { title: 'Búscar Propiedad', contenido: 'buscarPropiedad', user: req.cookies.username, propiedades: "" });
});

router.post('/buscar', function(req, res, next) {
  var dir = req.body.dir;
  var depto = req.body.depto;
  var muni = req.body.muni;

  console.log(dir);

  Propiedad.find({direccion: {$regex: dir, $options: 'i'} , departamento: depto, municipio: muni})
    .exec()
    .then(doc => {
      console.log(doc);
      res.render('perito/menu', { title: 'Búscar Propiedad', contenido: 'buscarPropiedad', user: req.cookies.username, propiedades: doc });
    })
    .catch(err => console.log(err));
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
