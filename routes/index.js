var express = require('express');
var router = express.Router();
var conn = require('./../DB/connection')
var mexp = require('math-expression-evaluator');

router.get('/home', (req,res,next)=>{
  res.render('home', { title: 'SAP | Home'});
})

router.get('/', function(req, res, next) {

  var indicador = "2+([var1]*[var2])";
  var campos = ["var1","var2"];
  var valores = ["5","3"];
  for (let i = 0; i < 2; i++) {
    //const regex = new RegExp("\\s*\\["+campos[i]+"*?\\]\\s*", "g");
    indicador = indicador.replace("["+campos[i]+"]",valores[i]);
  }
  //const regex =/\s*\[.*?\]\s*/g;
  console.log(indicador);
  console.log(mexp.eval(indicador));
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/simpleTest', (req, res, next)=>{
  res.render('avaluoSimple', { title: 'Avaluo simple', status:'', result:"d-none", fullname:"", address:"", area:"", total:""})
});

router.post('/simpleTest', (req, res, next)=>{
  var name = req.body.name;
  var lastname = req.body.lastname;
  let namefull = name +" "+ lastname;
  var lg = req.body.lg;
  var lt = req.body.lt;
  var address = req.body.address;
  var obs = req.body.obs;
  var area = req.body.area;
  var dpto = req.body.dpto;
  var cuadrante = req.body.cuadrante;

  var total = cuadrante * area;
  console.log(address);
 
  res.render('avaluoSimple', { title: 'Avaluo simple', status:'d-none', result:"visible" , fullname:namefull, address:address, area:area, total:"$"+total});
});

router.get('/connect', function(req, res, next) {
  conn.connectDB().then(()=>{
    console.log("Furula");
    conn.closeDB();
  }).catch((err)=>{
    console.log(err);
  });
  res.render('index', { title: 'Express' });
});

router.get('/connStatus', function(req, res, next) {
  return res.json({ msg: 'OK' }).status(200);
});

module.exports = router;
