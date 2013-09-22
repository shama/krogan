var path = nodeRequire('path');
var level = nodeRequire('level');
var sub = nodeRequire('level-sublevel');
//var createAssoc = nodeRequire('level-assoc');
var userhome = nodeRequire('userhome');
var PluginLoader = require('./plugin');

function Projects(loc) {
  if (!(this instanceof Projects)) return new Projects(loc);
  this.db = sub(level('projects.db', {valueEncoding: 'json'}));
  //this.assoc = createAssoc(this.db);
  this.plugins = null;
  this.home = path.resolve(userhome(), '.krogan');
}
module.exports = Projects;

Projects.prototype.get = function(cb) {
  return this.db.createReadStream({ keys: true, values: true });
};

Projects.prototype.add = function(name, location, cb) {
  this.db.put(name, location, cb);
};

// Make a given project the active project
Projects.prototype.active = function(id, cb) {
  var self = this;
  cb = cb || function() {};
  this.plugins = new PluginLoader();
  this.db.get(id, function(err, location) {
    self.plugins.discover([location, self.home]);
    self.plugins.run('onload', cb);
  });
};