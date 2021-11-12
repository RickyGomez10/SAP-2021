const express = require("express");
const router = express.Router();
const Usuario = require("../models/user");
const Propiedad = require("../models/propiedad");
const avaluoSchema = require("../models/avaluo");
const solicitudSchema = require("../models/solicitud");
const plantillaSchema = require("../models/plantilla");
const informeSchema = require("../models/informe");
const peritoSchema = require("../models/user");
const Imagen = require("../models/imagen");
const conn = require('./../DB/connection')
var objectid = require('mongodb').ObjectId;

router.get("/", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  console.log(req.cookies.username);
  console.log("hola");
  res.render("perito/menu", {
    title: "Inicio",
    contenido: "home",
    user: req.cookies.username,
  });
});

router.get("/addSchema", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  res.render("perito/menu", {
    title: "Añadir planos",
    contenido: "addPlano",
    user: req.cookies.username,
  });
});

router.get("/exportSchema", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  res.render("perito/menu", {
    title: "Exportar planos",
    contenido: "exportPlano",
    user: req.cookies.username,
  });
});

router.get("/templates", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  res.render("perito/menu", {
    title: "Plantillas previas",
    contenido: "templates",
    user: req.cookies.username,
  });
});

router.get("/avaluo/:idAvaluo?", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  if (req.params.idAvaluo)
    res.render("perito/menu", {
      title: "Avalúo",
      contenido: "avaluo",
      user: req.cookies.username,
      avaluo: req.params.idAvaluo,
    });
  else
    res.render("perito/menu", {
      title: "Inicio",
      contenido: "home",
      user: req.cookies.username,
    });
});

router.get("/verAvaluo/:idAvaluo?", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');

  avaluoSchema.findById(req.params.idAvaluo)
  .exec()
  .then((doc) => {
    res.render("perito/menu", {
      title: "Ver avalúo",
      contenido: "verAvaluo",
      user: req.cookies.username,
      datos: doc
    });
  })
  .catch((err) => console.log(err));

});

router.get("/buscar-propiedad", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');

  avaluoSchema.find({})
    .exec()
    .then((doc) => {

      res.render("perito/menu", {
        title: "Búscar Propiedad",
        contenido: "buscarPropiedad",
        user: req.cookies.username,
        propiedades: doc,
      });
    })
    .catch((err) => console.log(err));


});

router.get("/propiedad", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  Usuario.find({})
    .exec()
    .then((doc) => {
      if (doc != null) {
        console.log(doc);
        res.render("perito/menu", {
          title: "Propiedad",
          contenido: "propiedad",
          lista: doc,
          user: req.cookies.username,
        });
      } else {
        res.render("perito/menu", {
          title: "Propiedad",
          contenido: "propiedad",
          lista: null,
          user: req.cookies.username,
        });
      }
    })
    .catch((err) => console.log(err));
});


router.post("/buscar", function (req, res, next) {


  console.log(dir);

  Propiedad.find({
    direccion: { $regex: dir, $options: "i" },
    departamento: depto,
    municipio: muni,
  })
    .exec()
    .then((doc) => {
      res.render("perito/menu", {
        title: "Búscar Propiedad",
        contenido: "buscarPropiedad",
        user: req.cookies.username,
        propiedades: doc,
      });
    })
    .catch((err) => console.log(err));
});


router.get("/avaluos", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  Usuario.find({ user: req.cookies.username })
    .exec()
    .then((doc) => {
      var peritoid = doc[0]._id;

      solicitudSchema.find({ perito: peritoid })
        .exec()
        .then((doc) => {
          let list = []
          if (doc != null) {
            list = doc;

          }
          res.render("perito/menu", {
            title: "Mis avalúos",
            contenido: "listaAvaluos",
            lista: list,
            user: req.cookies.username,
          });
        })
        .catch((err) => console.log("uno"));
    })
    .catch((err) => console.log(err));
});

router.post("/insertarAvaluo", function (req, res, next) {
  conn.connectDB().then(async () => {
    let idavaluo = new objectid(req.body.idAvaluo);
    //var perito = await peritoSchema.find({ user: req.body.idAvaluo });
    var solicitud = await solicitudSchema.find({ _id: idavaluo });
    var idPerito = new objectid(solicitud.perito);
    console.log(req.body);
    avaluo = {
      _id: idavaluo,
      modelo: req.body,
      perito: idPerito,
      propiedad: null
    };

    var avaluo = await avaluoSchema(avaluo).save();
    solicitud.avaluoCompletado = true;
    var updatedSolicitud = await solicitudSchema.findOneAndUpdate({ _id: idavaluo }, { avaluoCompletado: true })
    console.log("Se ha guardado correctamente el avaluo")
    return res.json({}).status(200);
  });
  /* otra forma de guardar el avaluo
    peritoSchema.find({ user: req.body.idAvaluo }).then((doc) => {
      avaluo = {
        modelo: req.body,
        perito: doc[0]._id,
      };
  
      avaluoSchema(avaluo)
        .save()
        .then((doc) => console.log("Se ha guardado correctamente el avaluo"))
        .catch((err) => console.log(err));
    });
    */
});

router.get('/images-visualizer', (req, res, next) => {
  Imagen.find({}).
    exec()
    .then(doc => {
      res.render("perito/menu", {
        title: "Imagenes",
        contenido: "imageVi",
        user: req.cookies.username,
        imagenes: doc
      });
    });

});

router.get('/images-visualizer/:id', (req, res, next) => {
  Imagen.findById(req.params.id)
    .exec()
    .then(result => {
      console.log(result);
      res.render('perito/image-viewer', { title: "Imagen: " + result.nombre, nombre: result.nombre });
    });
});

router.get('/close', function (req, res, next) {
  res.clearCookie('username');
  res.redirect('/login');
});

router.get('/informe/:informe', (req, res, next) => {
  if (!req.cookies.username) return res.redirect('/login');

  informeSchema.findOne({ _id: req.params.informe })
    .exec()
    .then((informe) => {
      if (informe != null) {
        console.log(informe);
        plantillaSchema.findOne({ _id: informe.plantilla })
          .exec()
          .then((doc) => {
            if (doc != null) {
              let style = doc.contenido;
              avaluoSchema.findOne({ _id: informe.fuente })
                .exec()
                .then((avaluo) => {
                  if (avaluo != null) {

                    let contenido = "";

                    if (style == 'temp1') {
                      contenido = "formats/temp1";
                    } else if (style == 'temp2') {
                      contenido = "formats/temp2";
                    } else if (style == 'temp3') {
                      contenido = "formats/temp3";
                    }
                    return res.render("perito/menu", {
                      title: informe.nombre,
                      contenido: contenido,
                      user: req.cookies.username,
                      avaluo: avaluo.modelo
                    });

                  } else {
                    return res.render("perito/menu", {
                      title: "Error",
                      msg: "Recurso no encontrado",
                      user: req.cookies.username
                    });
                  }
                })
                .catch((err) => {
                  return res.render("perito/menu", {
                    title: "Error",
                    contenido: "not-found",
                    user: req.cookies.username
                  });
                });
            } else {
              return res.render("perito/menu", {
                title: "Error",
                contenido: "not-found",
                user: req.cookies.username
              });
            }
          })
          .catch((err) => {
            return res.render("perito/menu", {
              title: "Error",
              contenido: "not-found",
              user: req.cookies.username
            });
          });
      } else {
        return res.render("perito/menu", {
          title: "Error",
          contenido: "not-found",
          user: req.cookies.username
        });
      }
    })
    .catch((err) => {
      return res.render("perito/menu", {
        title: "Error",
        contenido: "not-found",
        user: req.cookies.username
      });
    });
});
router.get("/asignarAvaluo", function (req, res, next) {
  if (!req.cookies.username) return res.redirect('/login');
  conn.connectDB().then(async () => {
    var propiedades = await Propiedad.find();
    var solicitudes_avaluos = await solicitudSchema.find({ perito: null });
    var peritos = await peritoSchema.find();
    res.render("perito/menu", {
      title: "Asignar Avaluo",
      contenido: "asignacionAvaluo",
      user: req.cookies.username,
      prop: propiedades,
      peritos: peritos,
      solicitudes: solicitudes_avaluos,
    });
  })
});//cierre de asignar avaluo

router.post("/asignarAvaluo", function (req, res, next) {

  conn.connectDB().then(async () => {
    console.log(res)
    var idSolicitud = new objectid(req.body.idSolicitud);
    var idPerito = new objectid(req.body.idPerito);
    var solicitudAv = await solicitudSchema.findOneAndUpdate({ _id: idSolicitud }, { perito: idPerito });

    return res.json({}).status(200);

  })
});//cierre de asignar avaluo

router.get("/informes", function (req, res, next) {

  if (!req.cookies.username) return res.redirect('/login');
  let listFuentes = [];
  let listPlantillas = [];
  let listInformes = [];
  Usuario.findOne({ user: req.cookies.username })
    .exec()
    .then((doc) => {
      var peritoid = doc._id;

      solicitudSchema.find({ perito: peritoid, avaluoCompletado: true })
        .exec()
        .then((doc) => {
          if (doc != null) {
            listFuentes = doc;
          }
          plantillaSchema.find()
            .exec()
            .then((doc) => {
              if (doc != null) {
                listPlantillas = doc;
              }
              informeSchema.find({ perito: peritoid })
                .exec()
                .then((doc) => {
                  if (doc != null) {
                    listInformes = doc;
                  }
                  res.render("perito/menu", {
                    title: "Mis informes",
                    contenido: "listaInformes",
                    fuentes: listFuentes,
                    plantillas: listPlantillas,
                    informes: listInformes,
                    user: req.cookies.username,
                    peritoid: peritoid
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/crearInforme", function (req, res, next) {

    let informe = {
      nombre: req.body.nombre,
      fuente: req.body.fuente,
      plantilla: req.body.plantilla,
      perito: req.body.idperito
    }

    informeSchema(informe).save().then((response) => {
      return res.json({}).status(200);
    }).catch((err) => {
      return res.json({}).status(401);
    });

});

module.exports = router;
