var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const key  = require('./config/keys');
const userService = require('./services/userService');
var indexRouter = require('./routes/index');


// connecting to db.
mongoose.connect(key.mongodb.url)
  .then(() => {
    console.log('Connecte to db..');
    
    
    userService.addAdmin()
    .then(() => {
      console.log('Admin Added to db.');
    }).catch((err) => {
      console.log('fails to add admin into db.', err.message || 'Rejected Promise');
    });
    
  }).catch((err) => {
    console.log('Error wihile connection to db. ');
  });

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname,'views','partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: key.seession.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userService.findById(id)
  .then((user) => {
    done(null, user);
  }).catch((err) => {
    done(err);
  });
});



app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

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
