var server;

function Index($this) {
    server = $this;
    return route;
}

var route = function (req, res, next) {
    if (req.url && req.url.length > 1) {
        // some other URL that isn't the home. some weird bug with express 3x
        return next();
    }
    var object = server.getObject(req);
    if (req.session) {
        object.user = req.session.user;
    }
    res.render('index.ejs', object);
};

module.exports = Index;