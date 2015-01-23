var server;

function Profile($this) {
    server = $this;
    return route;
}

var route = function (req, res, next) {
    var object = server.getObject(req);
    if (req.session) {
        object.user = req.session.user;
    }
    res.render('profile.ejs', object);
};

module.exports = Profile;