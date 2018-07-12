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