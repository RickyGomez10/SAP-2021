const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')

router.get('/', function(req, res, next) {
  res.render('perito/home', { title: 'Inicio' });
});
router.get('/addSchema', function(req, res, next) {
  res.render('perito/addPlano', { title: 'Añadir planos' });
});
router.get('/exportSchema', function(req, res, next) {
  res.render('perito/exportPlano', { title: 'Exportar planos' });
});
router.get('/templates', function(req, res, next) {
  res.render('perito/templates', { title: 'Plantillas previas' });
});


module.exports = router;
