const express = require('express');
const router = express.Router();
const routeMid = require('../middleware/router');

router.use(routeMid.authorize);
router.get('/', (req, res, next) => {
    res.render('questionAsk', {
        req: req,
    })
});


module.exports = router;