var express = require('express');
var router = express.Router();
var conn = require('./../DB/connection')

router.get('/', function(req, res, next) {
  conn.connectDB().then(()=>{
    console.log("Furula");
    conn.closeDB();
  }).catch((err)=>{
    console.log(err);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
