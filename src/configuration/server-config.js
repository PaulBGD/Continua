var util = require("util");
var configuration = require("./");

function ServerConfig() {
    this._super("server.json");

    this.listen = 80;
}
util.inherits(ServerConfig, configuration);

ServerConfig.prototype.load = function (object) {
    object.listen = this.listen;
};

ServerConfig.prototype.save = function (object) {
    if (object.listen) {
        this.listen = object.listen;
    }
};

module.exports = new ServerConfig();