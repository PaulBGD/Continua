if (global._loginManager) {
    module.exports = global._loginManager;
    return global._loginManager;
}

var passport = require('passport');
var configuration = require('../configuration/login-config');

function LoginManager() {
    this.logins = [
        this.load('github')
    ];
}

LoginManager.prototype.load = function (name) {
    return require('./' + name);
}

module.exports = global._loginManager = new LoginManager();