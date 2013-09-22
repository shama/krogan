//var $ = window.jQuery = require('jquery2');
var _ = require('lodash');
var fs = nodeRequire('fs');
var path = nodeRequire('path');
//require('bootstrap-sass');

var View = require('./view')(function(filepath, data, opts) {
  return _.template(String(fs.readFileSync(filepath)))(data, opts);
});
var gruntfile = require('./gruntfile');
var projects = require('./projects')();

//projects.add('gaze', path.resolve('../', 'gaze'));

// Create Editor
new View('app/editor').render(document.querySelector('.content'));

// Load Gruntfile
function loadProject(name, location) {
  document.querySelector('.project-name').innerHTML = name;
  gruntfile(path.join(location, 'Gruntfile.js'))
    .render(document.querySelector('.gruntfile'));
}

// Create Sidebar
var nav = new View('app/partials/nav');
projects.get().pipe(nav);
nav.on('finish', function() {
  var el = document.querySelector('.sidebar-nav');
  nav.render(el);

  var hrefs = Array.prototype.slice.call(el.querySelectorAll('a'), 0);
  hrefs.forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      loadProject(e.target.getAttribute('data-name'), e.target.getAttribute('data-location'));
    }, false);
  });

  // Click the first li
  hrefs[0].dispatchEvent(new MouseEvent('click', { 'view': window, 'bubbles': true, 'cancelable': true }));
});

// DEBUG MODE
require('./debug')()
