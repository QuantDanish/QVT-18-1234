module.exports.renderWithUserName = (view, data = {},req, res, next)=> {
    if(data.links === undefined || data.links === null)
        data.links = [];
    data.links.push({
        name: `${req.user.firstname } ${req.user.lastname}`,
        address:  `/user/${req.user._id}`
    });

    res.render(view, data);
}

module.exports.authorize = (req, res, next)=> {
    if(req.session.passport !== undefined && req.user !== undefined)
        next();
    else
        res.redirect('/');
}