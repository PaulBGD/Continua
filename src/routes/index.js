function Index() {
    return this.route;
}

Index.prototype.route = function (req, res, next) {
    res.render('index.ejs');
};

module.exports = new Index();