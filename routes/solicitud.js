const express = require('express');
const router = express.Router();
const conn = require('./../DB/connection')
const solicitudSchema= require('../models/solicitud');
const propiedadSchema = require('../models/propiedad');
const peritoSchema = require('../models/user');
var objectid = require('mongodb').ObjectId

router.get('/', function(req, res, next){
    conn.connectDB().then( async ()=>{
            var propiedades = await propiedadSchema.find();
            var peritos = await peritoSchema.find({rol:'perito'});


            res.render('solicitudForm', {per: peritos, prop: propiedades});
        }
    )

})

router.post('/insertar', function(req, res, next) {
    var solicitud = {dui: String,
        dui: req.body.dui,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        Aceptado: false,
        Propiedad: req.body.propiedad,
        perito: null,
    }

    conn.connectDB().then(()=>{
    
        solicitudSchema(solicitud).save()
        .then(doc =>{
          console.log
    
          conn.closeDB();
        })
        .catch(err => console.log(err));
    
      }).catch(err=> console.log(err) );
      
});

//actualizar
router.post('/update', (req, res, next)=>{
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
    conn.connectDB().then(()=>{
      solicitudSchema.findByIdAndUpdate(id, solicitud).then(solicitud=>{
        res.status(200).json(solicitud);
        console.log('solicitud actualizada')
      }).catch(error=>
        console.log(error)
        )
    })
  
  })


//buscar por id
router.get('/search', (req, res, next)=>{
    var id = req.body.solicitudid
    var o_id = new objectid(id)
    conn.connectDB().then(()=>{
      solicitudSchema.find({_id: o_id}).then(solicitud=>{
        res.status(200).json(solicitud);
        console.log('solicitud encontrada')
      }).catch(error=>
        console.log(error)
        )
    })
  
  })

//buscar todos
router.get('/searchall', (req, res, next)=>{
  
    conn.connectDB().then(()=>{
      solicitudSchema.find().then(solicitudes=>{
        res.status(200).json(solicitudes);
        console.log('solicitudes encontradas')
      }).catch(error=>
        console.log(error)
        )
    })
  
  })





module.exports = router;