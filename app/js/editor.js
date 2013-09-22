var createEditor = require('javascript-editor');

module.exports = function(el) {
  var editor = createEditor({container: el});
  editor.on('valid', function(noErrors) {
    if (noErrors) console.log(editor.getValue());
  });
};