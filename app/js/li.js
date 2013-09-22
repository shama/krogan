var es = require('event-stream')
var Writable = require('stream').Writable

module.exports = function(el) {
  var s = new Writable()
  var fragment = document.createDocumentFragment()
  s.on('drain', function() {
    console.log('drain')
  })
  return s

  /*var clear = false
  var fragment = document.createDocumentFragment()
  var s = es.pipeline(
    es.split(),
    es.map(function(line, cb) {
      clear = false
      var li = document.createElement('li')
      li.innerHTML = line
      fragment.appendChild(li)
      cb(null, li)
    })
  )
  s.pause()
  s.on('drain', function() {
    console.log('drain')
    if (clear) el.innerHTML = ''
    el.appendChild(fragment)
    fragment = document.createDocumentFragment()
  })
  return s*/
}
