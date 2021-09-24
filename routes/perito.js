const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')

router.get('/', function(req, res, next) {
  res.render('perito/menu', { title: 'Inicio', contenido: 'home' });
});
router.get('/addSchema', function(req, res, next) {
  res.render('perito/menu', { title: 'Añadir planos', contenido: 'addPlano' });
});
router.get('/exportSchema', function(req, res, next) {
  res.render('perito/menu', { title: 'Exportar planos', contenido: 'exportPlano' });
});
router.get('/templates', function(req, res, next) {
  res.render('perito/menu', { title: 'Plantillas previas', contenido: 'templates' });
});
router.get('/listado', function(req, res, next) {
  res.render('perito/menu', { title: 'Plantillas previas', contenido: 'listaAvaluos' });
});


module.exports = router;
