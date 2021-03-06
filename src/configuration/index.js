var fs = require("fs");
var path = require("path");
var utils = require("../utils");

function Configuration(file) {
    this.file = path.join(__dirname + "/../../config", file);
    if(!fs.existsSync(__dirname + "/../../config")) {
        fs.mkdirSync(__dirname + "/../../config");
    }
    if (fs.existsSync(this.file)) {
        this.loadFromFile(true);
    } else {
        this.saveToFile(false);
    }
}

Configuration.prototype.load = function (object) {
    throw new Error("Not implemented");
};

Configuration.prototype.save = function (object) {
    throw new Error("Not implemented");
};

Configuration.prototype.saveToFile = function (sync) {
    var object = {};
    try {
        this.save(object);
    } catch (err) {
        console.error(err.stack);
    }
    utils.writeFile(this.file, JSON.stringify(object, undefined, 3), sync, function (err) {
        if (err) {
            return console.error(err.stack);
        }
    });
};

Configuration.prototype.loadFromFile = function (sync, data) {
    var $this = this;
    try {
        var loadedData;
        if (data) {
            loadedData = data;
        } else {
            loadedData = utils.readFile(this.file, sync, function (err, data) {
                if (err) {
                    console.error(err.stack);
                }
                $this.loadFromFile(undefined, data);
            });
        }
    } catch (err) {
        console.error(err.stack);
    }
    var object = {};
    if (loadedData) {
        try {
            object = JSON.parse(loadedData);
        } catch(err) {
            console.error(err.stack);
        }
    }
    this.load(object);
    this.configuration = object;
};

module.exports = Configuration;