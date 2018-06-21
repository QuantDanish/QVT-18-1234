var express = require('express');
var router = express.Router();
const userService = require('../services/userService');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST login user to their respective account */
router.post('/login', (req, res, next)=> {

  userService.authenticate(req.body.username,req.body.password)
  .then((user) => {
    if(user){
      return res.render('home', {
        firstname: user.firstname,
        lastname: user.lastname
      });
    }
    res.redirect("/");
  }).catch((err) => {
    res.redirect("/");    
  });
});

module.exports = router;
