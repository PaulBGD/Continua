var fs = require("fs");

function Utils() {

}

Utils.prototype.writeFile = function (file, content, sync, callback) {
    if (typeof sync == 'function') {
        callback = sync;
        sync = false;
    }
    if (sync) {
        try {
            fs.writeFileSync(file, content);
            callback();
        } catch (err) {
            callback(err);
        }
    } else {
        fs.writeFile(file, content, callback);
    }
};

Utils.prototype.readFile = function (file, sync, callback) {
    if (typeof sync == 'function') {
        callback = sync;
        sync = false;
    }
    if (sync) {
        var data = fs.readFileSync(file);
        callback(undefined, data);
        return data;
    } else {
        fs.readFile(file, callback);
    }
};

Utils.prototype.mergeObject = function (mergingTo, mergingFrom) {
    for (var property in mergingFrom) {
        if (mergingFrom.hasOwnProperty(property) && !mergingTo[property]) {
            mergingTo[property] = mergingFrom[property];
        }
    }
    return mergingTo;
};


module.exports = new Utils();