module.exports.renderWithUerName = (view, data = {},req, res, next)=> {
    data.links = [{
        name: `${req.user.firstname } ${req.user.lastname}`,
        address:  `/users/${req.user._id}`
    }];

    res.render(view, data);
}