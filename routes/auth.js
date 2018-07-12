const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passportConfig');



router.post('/',
passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',  
}),
(req, res, next) => {
    res.send("logged in");
}
);

module.exports = router;