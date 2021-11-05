const express = require('express');
const router = express.Router();
const Usuario = require('../models/user');

router.get('/', function (req, res, next) {
  res.render('login', { title: 'Inicio de Sesión' });
});

router.post('/verificar', function (req, res, next) {
  var usuario = req.body.user;
  var contra = req.body.pass;

  Usuario.findOne({ user: usuario })
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc != null) {
        if (doc.password == contra) {
          res.cookie('username',usuario);
        } else {
          res.send({ msg: 'Error de validación' }).status(401);
        }
      } else {
        res.send({ msg: 'Error de validación' }).status(401);
      }
    })
    .catch(err => console.log(err));

});

module.exports = router;