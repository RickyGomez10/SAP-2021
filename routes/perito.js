const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')

router.get('/', function(req, res, next) {
  res.render('perito/home', { title: 'Home' });
});

module.exports = router;
