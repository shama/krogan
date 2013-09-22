if (!global.nodeRequire) global.nodeRequire = require;

var path = require('path');
var pluginLoader = require('../app/js/plugin.js');

var fixtures = path.resolve(__dirname, 'fixtures');

module.exports.plugin = {
  setUp: function(done) {
    this.plugins = pluginLoader();
    this.plugins.discover([
      path.join(fixtures, 'myproject')
    ]);
    done();
  },
  tearDown: function(done) {
    this.plugins = null;
    done();
  },
  discover: function(test) {
    test.expect(1);
    test.equal(this.plugins.loaded.length, 1, 'Discovered and loaded 1 plugin.');
    test.done();
  },
  run: function(test) {
    test.expect(1);
    var plugin = this.plugins.loaded[0];
    this.plugins.run('onload', function() {
      test.ok(plugin.loaded, 'The plugin onload method has ran.');
      test.done();
    });
  },
};
