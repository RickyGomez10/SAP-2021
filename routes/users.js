var express = require('express');
const User  = require('../models/user');
const conn = require('./../DB/connection')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  var params = req.body;
  var newUser = new User(params);

  conn.connectDB().then(()=>{
    
    newUser
    .save()
    .then((usuario) => {
      res.status(200).json({
        "mensaje": "Usuario registrado correctamente.",
        "Usuario": usuario,
      });
    })
    .catch((err) => {
      console.log(err);
    })
  })
  
});

module.exports = router;
