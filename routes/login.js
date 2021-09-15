var express = require('express');
var router = express.Router();
var conn = require('./../DB/connection')

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Inicio de Sesión' });
});

module.exports = router;