var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', (req, res, next)=> {
  res.render('users',{
    title: 'Forum',
    username: req.username,
  })
});

module.exports = router;
