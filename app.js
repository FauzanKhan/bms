var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
exports.app = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*app.get('/', function(req, res, next) {
  res.render('index', { title: 'BookmyShow - Assignment' });
});

/*app.post('/', function(req, res){
  var arr = req.body.userInput;
  if(typeof arr === 'undefined'){
    res.render('index', {title : 'Error', flashMessage : 'An error occurred while processing you request. Please try again', type: 'error'});
  }
  else{
    var array = arr.split(',');
    client.set('userArray', array);
    res.render('index', {title : 'Success', flashMessage : 'Post Complete', type: 'success'});
  }
  console.log(arr);
  client.get('userArray', function(err, reply) {
    console.log(reply);
  });
});*/




// catch 404 and forward to error handler

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);
var routes = require('./routes/index');
app.use('/', routes);
