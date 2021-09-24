const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const imagenSchema = require('../models/imagen');
const { response, path } = require('../app');

const pat = require('path');
const multer = require('multer')

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
    res.render('uploadimage');
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

module.exports = router;