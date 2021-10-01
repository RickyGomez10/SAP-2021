var express = require('express');
var router = express.Router();
var conn = require('./../DB/connection')

router.get('/home', (req,res,next)=>{
  res.render('home', { title: 'SAP | Home' });
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/simpleTest', (req, res, next)=>{
  res.render('avaluoSimple', { title: 'Avaluo simple' })
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
