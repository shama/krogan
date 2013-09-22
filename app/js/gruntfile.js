var fs = nodeRequire('fs');
var path = nodeRequire('path');
//var falafel = nodeRequire('falafel');
var createEditor = require('javascript-editor');

function Gruntfile(filepath) {
  if (!(this instanceof Gruntfile)) return new Gruntfile(filepath);
  this.path = filepath || 'Gruntfile.js';
}
module.exports = Gruntfile;

Gruntfile.prototype.render = function(el) {
  var self = this;
  el.innerHTML = '';
  this.editor = createEditor({container: el});

  var gruntfile = String(fs.readFileSync(path.resolve('./', this.path)));
  this.editor.setValue(this.parse(gruntfile));

  this.editor.on('valid', function(noErrors) {
    if (noErrors) {
      //console.log(self.editor.getValue());
      //fs.writeFileSync(this.path, self.editor.getValue());
    }
  });
};

Gruntfile.prototype.parse = function(text) {
  return text;
};