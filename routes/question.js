const express = require('express');
const router = express.Router();
const routeMid = require('../middleware/router');

router.use(routeMid.authorize);
router.get('/', (req, res, next) => {
    res.render('questionAsk', {
        user: req.user
    })
});


module.exports = router;