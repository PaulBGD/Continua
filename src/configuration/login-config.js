var util = require("util");
var configuration = require("./");

function LoginConfig() {
    this.services = [
        {
            name: "GitHub",
            options: {
                clientID: "GITHUB_CLIENT_ID",
                clientSecret: "GITHUB_CLIENT_SECRET"
            }
        }
    ];

    LoginConfig.super_.apply(this, ["logins.json"]);
}
util.inherits(LoginConfig, configuration);

LoginConfig.prototype.load = function(object) {
    if (object.services) {
        this.services = object.services;
    }
};

LoginConfig.prototype.save = function(object) {
    object.services = this.services;
};

module.exports = new LoginConfig();