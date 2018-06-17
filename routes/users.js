var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST login user to their respective account */
router.post('/login', (req, res, next)=> {
  console.log(req.username," ,",req.passowrd);
  res.render('home', {
    username: req.body.username,
    passowrd: req.body.password
  });
});

module.exports = router;
