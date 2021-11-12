const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const solicitudSchema = require('../models/solicitud');
const propiedadSchema = require('../models/propiedad');
const peritoSchema = require('../models/user');
var objectid = require('mongodb').ObjectId

router.get('/', function (req, res, next) {
  conn.connectDB().then(async () => {
    var propiedades = await propiedadSchema.find();
    var peritos = await peritoSchema.find({ rol: 'perito' });


    res.render('solicitudForm', { per: peritos, prop: propiedades });
  }
  )

})

router.post('/insertar', function (req, res, next) {

  let errors = "";

  let solicitud = {
    dui: req.body.dui,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    telefono: req.body.tel,
    correo: req.body.correo,
    direccion1: req.body.dir1,
    direccion2: req.body.dir2,
    puntosReferencia: req.body.refs,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    avaluoCompletado: false,
    avaluoSimple: req.body.valuo ? req.body.valuo : null,
    fecha: new Date(),
    perito: null,
  }

  if (solicitud.dui.trim() == "") errors += "dui,";
  const regNom = /^[A-Za-z ]{1,50}$/;
  if (solicitud.nombres.trim() == "" || !regNom.test(solicitud.nombres)) errors += "nombres,";
  if (solicitud.apellidos.trim() == "" || !regNom.test(solicitud.apellidos)) errors += "apellidos,";
  const regTel = /^\d{4,}$/;
  if (solicitud.telefono.trim() == "" || !regTel.test(solicitud.telefono)) errors += "tel,";
  const regCorreo = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (solicitud.correo.trim() == "" || !regCorreo.test(solicitud.correo.toLowerCase())) errors += "correo,";
  if (solicitud.direccion1.trim() == "") errors += "dir1,";
  if (solicitud.pais.trim() == "") errors += "pais,";
  if (solicitud.ciudad.trim() == "") errors += "ciudad";

  console.log(errors);
  if (errors.length == 0) {
    conn.connectDB().then(() => {

      solicitudSchema(solicitud).save()
        .then(doc => {
          console.log("Guardado");

          conn.closeDB();
        })
        .catch(err => console.log(err));

    }).catch(err => console.log(err));
    return res.json({}).status(200);
  } else {
    return res.status(400).send(errors);
  }

});

//actualizar
router.post('/update', (req, res, next) => {
  /*
dui: String,
  nombre: String,
  telefono: String,
  correo: String,
  aceptado: Boolean,
  propiedad: mongoose.Schema.Types.ObjectId,
  perito: mongoose.Schema.Types.ObjectId,
  */

  var propiedadid = req.body.propiedad
  var userid = req.body.userid
  var o_id_prop = new objectid(o_id_prop)
  var o_id_user = new objectid(o_id_user)

  //pendiente de agregar avaluoSimple
  var solicitud = {
    dui: req.body.dui,
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    correo: req.body.correo,
    aceptado: req.body.aceptado,
    propiedad: o_id_prop,
    perito: o_id_user
  }

  var id = req.body.solicitudid
  var o_id = new objectid(id)
  conn.connectDB().then(() => {
    solicitudSchema.findByIdAndUpdate(id, solicitud).then(solicitud => {
      res.status(200).json(solicitud);
      console.log('solicitud actualizada')
    }).catch(error =>
      console.log(error)
    )
  })

})


//buscar por id
router.get('/search', (req, res, next) => {
  var id = req.body.solicitudid
  var o_id = new objectid(id)
  conn.connectDB().then(() => {
    solicitudSchema.find({ _id: o_id }).then(solicitud => {
      res.status(200).json(solicitud);
      console.log('solicitud encontrada')
    }).catch(error =>
      console.log(error)
    )
  })

})

//buscar todos
router.get('/searchall', (req, res, next) => {

  conn.connectDB().then(() => {
    solicitudSchema.find().then(solicitudes => {
      res.status(200).json(solicitudes);
      console.log('solicitudes encontradas')
    }).catch(error =>
      console.log(error)
    )
  })

})





module.exports = router;