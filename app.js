var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

const conn = require('./DB/connection');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var peritoRouter = require('./routes/perito');
var imagenRouter = require('./routes/imagen');
var propiedadRouter = require('./routes/propiedad');
var solicitudRouter = require('./routes/solicitud');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/imagesdb', express.static(__dirname + '/images'));
app.use('/bjs', express.static(__dirname + '/public/assets/vendor/bootstrap/js')); // redirect bootstrap JS
app.use('/jq', express.static(__dirname + '/public/assets/vendor/jquery')); // redirect JS jQuery
app.use('/bs', express.static(__dirname + '/public/assets/css')); // redirect CSS bootstrap
app.use('/swal', express.static(__dirname + '/node_modules/sweetalert2/dist')); // SweetAlerts
app.use('/bi', express.static(__dirname + '/node_modules/bootstrap-icons')); // Bootstrap icons
app.use('/img', express.static(__dirname + '/public/images')); // Images
app.use('/idb', express.static(__dirname + '/node_modules/idb/build/iife')); //IndexedDB
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/', express.static(__dirname));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/perito', peritoRouter);
app.use('/imagen', imagenRouter);
app.use('/propiedad', propiedadRouter);
app.use('/solicitud', solicitudRouter);

conn.connectDB();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
