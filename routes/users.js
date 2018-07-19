const express = require('express');
const router = express.Router();
const routeMid = require('../middleware/router');
// const passport = require('passport');
// const passportConfig = require('../config/passportConfig');


router.use(routeMid.authorize);

router.get('/home', (req, res, next) => {
    res.render('home', {
        user: req.user
    });
});

router.get('/', (req, res, next) => {
    res.render('user', {
        user: req.user,
        User: req.user
    });
});

module.exports = router;
