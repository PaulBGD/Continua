var util = require("util");
var crypto = require("crypto");
var configuration = require("./");

function ServerConfig() {
    this.listen = process.env.PORT ? process.env.PORT : 80;
    this.ip = process.env.IP ? process.env.IP : "127.0.0.1"; // used for certain development environments
    this.key = crypto.randomBytes(20).toString('hex');

    ServerConfig.super_.apply(this, ["server.json"]);
}
util.inherits(ServerConfig, configuration);

ServerConfig.prototype.load = function (object) {
    if (object.listen) {
        this.listen = object.listen;
    }
    if (object.key) {
        this.key = object.key;
    }
};

ServerConfig.prototype.save = function (object) {
    object.listen = this.listen;
    object.key = this.key;
};

module.exports = new ServerConfig();