const express = require("express");
const router = express.Router();
const Usuario = require("../models/user");
const Propiedad = require("../models/propiedad");
const avaluoSchema = require("../models/avaluo");
const peritoSchema = require("../models/user");
const Imagen = require("../models/imagen");
const conn = require('./../DB/connection')
const { PreconditionFailed } = require("http-errors");

router.get("/", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
  console.log(req.cookies.username);
  console.log("hola");
  res.render("perito/menu", {
    title: "Inicio",
    contenido: "home",
    user: req.cookies.username,
  });
})

router.get("/addSchema", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
  res.render("perito/menu", {
    title: "Añadir planos",
    contenido: "addPlano",
    user: req.cookies.username,
  });
})

router.get("/exportSchema", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
  res.render("perito/menu", {
    title: "Exportar planos",
    contenido: "exportPlano",
    user: req.cookies.username,
  });
})

router.get("/templates", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
  res.render("perito/menu", {
    title: "Plantillas previas",
    contenido: "templates",
    user: req.cookies.username,
  });
})
 
router.get("/avaluo/:idAvaluo?", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
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
})
 
router.get("/buscar-propiedad", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
  res.render("perito/menu", {
    title: "Búscar Propiedad",
    contenido: "buscarPropiedad",
    user: req.cookies.username,
    propiedades: "",
  });
})
 
router.get("/propiedad", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
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
})
 

router.post("/buscar", function (req, res, next) {
  var dir = req.body.dir;
  var depto = req.body.depto;
  var muni = req.body.muni;

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
})


router.get("/listado", function (req, res, next) {
  if(!req.cookies.username) return res.redirect('/login');
  Usuario.find({ user: req.cookies.username })
    .exec()
    .then((doc) => {
      var peritoid = doc[0]._id;

      avaluoSchema.find({perito: peritoid})
        .exec()
        .then((doc) => {
          if (doc != null) {
            console.log(doc);
            res.render("perito/menu", {
              title: "Plantillas previas",
              contenido: "listaAvaluos",
              lista: doc,
              user: req.cookies.username,
            });
          } else {
            res.render("perito/menu", {
              title: "Plantillas previas",
              contenido: "listaAvaluos",
              lista: [],
              user: req.cookies.username,
            });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));



  /*Usuario.find({})
    .exec()
    .then((doc) => {
      if (doc != null) {
        res.render("perito/menu", {
          title: "Plantillas previas",
          contenido: "listaAvaluos",
          lista: doc,
          user: req.cookies.username,
        });
      } else {
        res.render("perito/menu", {
          title: "Plantillas previas",
          contenido: "listaAvaluos",
          lista: null,
          user: req.cookies.username,
        });
      }
    })
    .catch((err) => console.log(err));*/
})


router.post("/insertarAvaluo", function (req, res, next) {

  conn.connectDB().then(async () => {

    var perito = await peritoSchema.find({ user: req.body.idAvaluo });

    avaluo = {
      modelo: req.body,
      perito: perito[0]._id,
    };

    var avaluo = await avaluoSchema(avaluo).save();
    console.log("Se ha guardado correctamente el avaluo")
    conn.closeDB();
    return res.json({}).status(200);
  })
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
})

router.get('/images-visualizer', (req, res, next)=>{
  Imagen.find({}).
  exec()
  .then(doc =>{
    res.render("perito/menu", {
      title: "Imagenes",
      contenido: "imageVi",
      user: req.cookies.username,
      imagenes : doc
    });
  });
  
})

router.get('/images-visualizer/:id', (req, res, next)=>{
  Imagen.findById(req.params.id)
  .exec()
  .then(result =>{
    console.log(result);
    res.render('perito/image-viewer',{title:"Imagen: "+result.nombre, nombre:result.nombre});
  });
})

router.get('/close', function(req, res, next) {
  res.clearCookie('username');
  res.redirect('/login');
})


module.exports = router;
