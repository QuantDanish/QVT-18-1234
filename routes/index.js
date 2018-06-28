const express = require('express');
const router = express.Router();
const users = require('./users');



router.use('/users', users);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.resolve(__dirname,'/public','index.html'));
  //res.render('index', { title: 'Express' });
});

module.exports = router;
