function Login(name, icon) {
    this.name = name;
    this.simpleName = name.toLowerCase().replace(' ', '-');
    this.icon = icon;
}

Login.prototype.handle = function(req, res) {
    throw new Error("Not implemented");
};

module.exports = Login;