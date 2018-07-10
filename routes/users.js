const express = require('express');
const router = express.Router();
const routeMid = require('../middleware/router');
// const passport = require('passport');
// const passportConfig = require('../config/passportConfig');


router.get('/',
routeMid.authorize,
(req, res, next) => {
    res.send("Welcome to user GET"+ req.user.firstname);
});


router.get('/hello',
routeMid.authorize,
(req, res, next) => {
    res.send(`Hello ! ${req.user.firstname} ${req.user.lastname}`);
});


module.exports = router;
