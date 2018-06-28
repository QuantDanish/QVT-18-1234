const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const passport = require('../config/passportConfig');
const routerMiddleware = require('../middleware/router');


/* GET users listing. */
router.get('/:userId',
  passport.authenticate,
  (req, res, next) => {
  routerMiddleware.renderWithUerName('home',req.user,req, res, next);
});

/* POST login user to their respective account */
router.post('/login', 
    passport.authorize ,
    (req, res, next)=> {
      routerMiddleware.renderWithUerName('home',{}, req, res, next);
});

module.exports = router;
