var util = require("util");
var configuration = require("./");

function ServerConfig() {
    this.listen = process.env.PORT ? process.env.PORT : 80;
    this.ip = process.env.IP ? process.env.IP : "127.0.0.1";
    
    ServerConfig.super_.apply(this, ["server.json"]);
}
util.inherits(ServerConfig, configuration);

ServerConfig.prototype.load = function (object) {
    if (object.listen) {
        this.listen = object.listen;
    }
};

ServerConfig.prototype.save = function (object) {
    object.listen = this.listen;
};

module.exports = new ServerConfig();