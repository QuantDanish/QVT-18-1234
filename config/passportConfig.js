// this is passport authentication configuration file.
const User = require('../model/index').User;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: "emailId",
    passwordField: "password"
    },
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      user.comparePassword(password, function(err, result) {
        if(err)
            return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);        
      });
    });
  }
));

module.exports.authorize = (req, res, next)=> {
    User.findOne({emailId: new RegExp(req.body.emailId, 'i')})
    .then((user) => {
        user.comparePassword(req.body.password, (err, result)=> {
            if(err || !result) res.redirect("back");
            req.user = user;
            next();
        });
    }).catch((err) => {
        res.redirect("back");
    });
}

module.exports.authenticate = (req,res,next) => {
    User.findById(req.params.userId)
    .then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        res.redirect('/');
    });
}