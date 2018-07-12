const express = require('express');
const router = express.Router();
const routeMid = require('../middleware/router');
// const passport = require('passport');
// const passportConfig = require('../config/passportConfig');


router.use(routeMid.authorize);

router.get('/', (req, res, next) => {
    res.render('home', {
        links : [{
            name: `${req.user.firstname } ${req.user.lastname}`,
            address:  `/user/${req.user._id}`
        }]
    })
});

module.exports = router;
