const express = require('express');
const router = express.Router();
const routeMid = require('../middleware/router');
// const passport = require('passport');
// const passportConfig = require('../config/passportConfig');


router.use(routeMid.authorize);

router.get('/home', (req, res, next) => {
    res.render('home', {
        req: req
    });
});

module.exports = router;
