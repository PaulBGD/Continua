var request = require("request");
var utils = require("../utils");
var path = require('path');
var express = require('express.io');
var ejs = require("ejs");
var app = express();

var config = require("../configuration/server-config");
var login = require('../login/manager.js');

// setup Connect
app.use(express.cookieParser());
app.use(express.session({
    secret: config.key
}));

app.engine('html', ejs.renderFile);
app.set('views', './panel/pages');
app.set('view engine', 'html');
app.use(express.static('./panel/static'));

var pages = [{
    title: "Home",
    url: "",
    file: "index"
}, {
    title: "Profile",
    url: "/profile",
    file: "profile"
}, {
    title: "Log In",
    url: "/login",
    file: "login"
}];

function Server() {
    var $this = this;
    this.io = app.http().io();

    // start routing
    utils.each(pages, function (index, object) {
        try {
            var route = require('../routes/' + object.file);
        } catch (err) {
            console.error("Failed to load route for page '" + object.title + "'");
            return;
        }
        app.use(object.url, route($this));
    });
}

Server.prototype.start = function () {
    if (this.running) {
        return;
    }
    app.listen(config.listen);
    this.running = true;
    console.debug("Listening on " + config.listen);
    return config.listen;
};

Server.prototype.stop = function () {
    if (this.running) {
        app.close();
        this.running = false;
    }
};

Server.prototype.getObject = function (req) {
    var name = utils.each(pages, function (index, object) {
        if (object.url === '') {
            if (req.originalUrl === '/') {
                return object.title;
            }
        } else if (req.originalUrl.indexOf(object.url) === 0) {
            return object.title;
        }
    });
    return {
        page: {
            title: name
        }
    }
};

module.exports = new Server();