function Index() {
    return this.route;
}

Index.prototype.route = function(req, res, next) {
    if (req.url.length > 1) {
        // some other URL that isn't the home. some weird bug with express 3x
        return next();
    }
    res.render('index.ejs', {
        page: {
            title: "Dashboard"
        }
    });
};

module.exports = new Index();