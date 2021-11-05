const express = require('express');
const router = express.Router();
const Usuario = require('../models/user');

router.get('/', function (req, res, next) {
  res.render('login', { title: 'Inicio de Sesión' });
});

router.post('/verificar', function (req, res, next) {
  var usuario = req.body.username;
  var contra = req.body.password;

  console.log(usuario);
  Usuario.findOne({ user: usuario })
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc != null) {
        if (doc.password == contra) {
          res.cookie('username',usuario);
          res.redirect('/perito');
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