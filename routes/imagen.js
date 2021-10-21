const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const imagenSchema = require('../models/imagen');
const { response, path } = require('../app');

const pat = require('path');
const multer = require('multer')

var objectid = require('mongodb').ObjectId
// Subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
      // Ubicacion donde se guardara el archivo, en este caso root/Images
      cb(null, 'Images')
    },
    filename: (req, file, cb)=>{

      var nombre_archivo = req.body.nombre;
      console.log(file);
      console.log(Date.now());
      cb(null, nombre_archivo + pat.extname(file.originalname));
    }


})

//Ubicacion donde se guardara el archivo, toma el objeto multer.diskStorage
const upload = multer({storage: storage})


router.get('/upload', function(req, res, next){

  res.render('perito/menu', { title: 'Inicio', contenido: '../uploadimage', user: req.cookies.username });
  //res.render('uploadimage');
})

router.post('/upload', upload.single("image"), function(req, res, next) {
    res.send('image uploaded');
    var nombre_archivo = req.body.nombre;
    conn.connectDB().then(()=>{
    
      imagenSchema({nombre: nombre_archivo}).save()
      .then(doc =>{
        console.log
  
        conn.closeDB();
      })
      .catch(err => console.log(err));
  
    }).catch((err)=>{
      console.log(err);
    });
});

router.post('/insertar', upload.single("image"), function(req, res, next) {
 
});

//buscar imagen, falta implementar logica para obtener url del servidor
router.get('/search', (req, res, next)=>{
  var id = req.body.imagenid
  var o_id = new objectid(id)
  conn.connectDB().then(()=>{
    imagenSchema.find({_id: o_id}).then(user=>{
      res.status(200).json(user);
      console.log('imagen encontrada')
    }).catch(error=>
      console.log(error)
      )
  })

})

//buscar todas las imagenes, falta implementar logica para obtener url del servidor

router.get('/searchall', (req, res, next)=>{

  conn.connectDB().then(()=>{
    imagenSchema.find().then(user=>{
      res.status(200).json(user);
      console.log('imagenes encontradas')
    }).catch(error=>
      console.log(error)
      )
  })
})
module.exports = router;