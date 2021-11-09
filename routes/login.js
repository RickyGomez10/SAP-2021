const express = require('express');
const router = express.Router();
const Usuario = require('../models/user');

router.get('/', function (req, res, next) {
  res.render('login', { title: 'Inicio de Sesión' });
});

router.post('/verificar', function (req, res, next) {
  var usuario = req.body.username;
  var contra = req.body.password;
  Usuario.findOne({ user: usuario })
    .exec()
    .then(doc => {
      if (doc != null) {
        if (doc.password == contra) {
          res.cookie('username',usuario);
          res.status(200).send({ msg: 'Validación correcta' });
        } else {
          res.status(401).send({ msg: 'Error de validación' });
        }
      } else {
        console.log("error");
        res.status(401).send({ msg: 'Error de validación' });
      }
    })
    .catch(err => console.log(err));

});

module.exports = router;