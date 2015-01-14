var express = require('express');
var app = express();

var config = require("../configuration/server-config");

var pages = [
    {
        title: "Home",
        url: "/",
        file: "index"
    }
];

function Server() {
    if (config.listen == 443) {
        this.server = require("https").Server(app);
    } else {
        this.server = require("http").Server(app);
    }
    this.io = require('socket.io')(this.server);

    // start routing
    // start with static assets
    app.use("/css", express.static('./static/styles'));
    app.use("/js", express.static('./static/js'));
}

Server.prototype.start = function () {
    if (this.running) {
        return;
    }
    // todo startup and if successful
    this.server.listen(config.listen);
    this.running = true;
    return config.listen;
};

Server.prototype.stop = function () {
    if (this.running) {
        // todo stop and if successful
        this.running = false;
    }
};

module.exports = new Server();