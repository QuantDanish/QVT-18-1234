const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passportConfig');



router.get('/',
(req, res, next) => {
    res.render('login',{ layout: null});
});

router.post('/',
passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth',  
}),
(req, res, next) => {
    res.send("logged in");
}
);

module.exports = router;