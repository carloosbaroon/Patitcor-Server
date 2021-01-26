var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

const multer = require("multer");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mascotaRouter = require("./routes/mascotaRouter");
var productoRouter = require("./routes/productosRouter");
const servicioRouter = require("./routes/serviciosRouter");

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to the server');
}, err =>{ console.log('Couldnt connect to DB!!!! ',err)});

var app = express();

app.all('*', (req, res, next) => {
  if(req.secure){
    return next();
  }
  else {
    res.redirect(307,'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/animales', mascotaRouter);
app.use('/productos', productoRouter);
app.use('/servicios', servicioRouter);

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myImage");

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    //iconsole.log("Request ---", req.body);
    console.log("Request file ---", req.file);//Here you get file.
    /*Now do where ever you want to do*/
    if(!err) {
      return res.send(200).end();
    }
  })
})

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
