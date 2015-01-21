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
    url: "/",
    file: "index"
}];

function Server() {
    this.io = app.http().io();

    // start routing
    utils.each(pages, function(index, object) {
        try {
            var route = require('../routes/' + object.file);
        } catch (err) {
            console.log("Failed to load route for page '" + object.title + "'");
            return;
        }
        console.log("Registered " + object.title + " for url " + object.url);
        app.use(object.url, route);
    });
}

Server.prototype.start = function() {
    if (this.running) {
        return;
    }
    app.listen(config.listen);
    this.running = true;
    return config.listen;
};

Server.prototype.stop = function() {
    if (this.running) {
        app.close();
        this.running = false;
    }
};

module.exports = new Server();