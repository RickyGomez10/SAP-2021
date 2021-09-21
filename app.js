var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var peritoRouter = require('./routes/perito');
var imagenRouter = require('./routes/imagen');

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
app.use('/bjs', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/swal', express.static(__dirname + '/node_modules/sweetalert2/dist')); // SweetAlerts
app.use('/bi', express.static(__dirname + '/node_modules/bootstrap-icons')); // Bootstrap icons
app.use('/img', express.static(__dirname + '/public/images')); // Images
app.use('/css', express.static(__dirname + '/public/stylesheets'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/perito', peritoRouter);
app.use('/imagen', imagenRouter);

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
