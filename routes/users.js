var express = require('express');
const User  = require('../models/user');
const conn = require('./../DB/connection')
var router = express.Router();
var objectid = require('mongodb').ObjectId

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
//buscar
router.get('/search', (req, res, next)=>{
  var id = req.body.userid
  var o_id = new objectid(id)
  conn.connectDB().then(()=>{
    User.find({_id: o_id}).then(user=>{
      res.status(200).json(user);
      console.log('usuario encontrado')
    }).catch(error=>
      console.log(error)
      )
  })

})

//buscar todos
router.get('/searchall', (req, res, next)=>{

  conn.connectDB().then(()=>{
    User.find().then(user=>{
      res.status(200).json(user);
      console.log('usuario encontrado')
    }).catch(error=>
      console.log(error)
      )
  })

})
module.exports = router;
