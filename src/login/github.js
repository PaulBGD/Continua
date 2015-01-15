var util = require('util');
var login = require("./");

function GitHub() {
    
}
util.inherits(GitHub, login);

GitHub.prototype.handle = function (req, res) {
    
}

module.exports = new GitHub();