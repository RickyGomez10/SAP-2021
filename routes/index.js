var express = require('express');
var router = express.Router();
var conn = require('./../DB/connection')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/connect', function(req, res, next) {
  conn.connectDB().then(()=>{
    console.log("Furula");
    conn.closeDB();
  }).catch((err)=>{
    console.log(err);
  });
  res.render('index', { title: 'Express' });
});

router.get('/connStatus', function(req, res, next) {
  res.json({ msg: 'OK' }).status(200);
});

module.exports = router;
