// this is passport authentication configuration file.
const User = require('../model/index').User;

module.exports.authorize = (req, res, next)=> {
    User.findOne({emailId: new RegExp(req.body.emailId, 'i')})
    .then((user) => {
        user.comparePassword(req.body.password, (err, result)=> {
            if(err || !result) res.redirect("back");
            req.user = user;
            next();
        });
    }).catch((err) => {
        res.redirect("back");
    });
}


module.exports.authenticate = (req,res,next) => {
    User.findById(req.params.userId)
    .then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        res.redirect('/');
    });
}