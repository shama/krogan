var path = nodeRequire('path');
var fs = nodeRequire('fs');
var async = require('async');

function Plugin() {
  if (!(this instanceof Plugin)) return new Plugin();
  this.loaded = [];
  this.timeout = 3000;
}
module.exports = Plugin;

Plugin.prototype.discover = function(paths) {
  var self = this;
  if (!Array.isArray(paths)) paths = [paths];
  function isplugin(p) {
    var pkg = path.join(p, 'package.json');
    if (!fs.existsSync(pkg)) return false;
    pkg = require(pkg);
    return !!pkg.krogan;
  }
  paths.forEach(function(p) {
    var search = path.join(p, 'node_modules');
    if (!fs.existsSync(search)) return;
    fs.readdirSync(search).forEach(function(mod) {
      var plugin = path.join(p, 'node_modules', mod);
      if (isplugin(plugin)) {
        self.load(plugin);
      }
    });
  });
};

Plugin.prototype.load = function(plugin) {
  this.loaded.push(require(plugin)());
};

Plugin.prototype.run = function(event, cb) {
  var self = this;
  async.eachSeries(this.loaded, function(plugin, next) {
    if (event in plugin) {
      var interval = setTimeout(next, self.timeout);
      plugin[event](function() {
        clearInterval(interval);
        next();
      });
    } else {
      next();
    }
  }, cb);
};


// EXAMPLE PLUGIN STRUCTURE
// Plugins export an instance of krogan plugin
/*

var KroganPlugin = require('krogan-plugin');
var MyPlugin = module.exports = new KroganPlugin();

// Override methods to add plugin functionality
MyPlugin.onload = function(cb) {
  // Do things when the project loads
  // Call cb() when done
};

// OR you could inherit if you prefer the verbose way
var util = require('util');
var KroganPlugin = require('krogan-plugin');
function MyPlugin() {
  this.super_.call(this);
}
util.inherits(MyPlugin, KroganPlugin);
module.exports = MyPlugin;

MyPlugin.prototype.onload = function(cb) {
  cb();
};

*/