const express = require('express');
const router = express.Router();
const users = require('./users');
const auth = require('./auth');
const question = require('./question');

router.use('/user', users);
router.use('/auth', auth);
router.use('/question', question);

router.get('/', (req, res, next) => {
    res.render('login',{ layout: null});
});

module.exports = router;
