var level = nodeRequire('level');
var sub = nodeRequire('level-sublevel');
//var createAssoc = nodeRequire('level-assoc');

function Projects(loc) {
  if (!(this instanceof Projects)) return new Projects(loc);
  this.db = sub(level('projects.db', {valueEncoding: 'json'}));
  //this.assoc = createAssoc(this.db);
}
module.exports = Projects;

Projects.prototype.get = function(cb) {
  return this.db.createReadStream({ keys: true, values: true });
};

Projects.prototype.add = function(name, location, cb) {
  this.db.put(name, location, cb);
};