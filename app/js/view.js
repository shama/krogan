module.exports = function(fn) {
  var Writable = nodeRequire('stream').Writable
  var util = nodeRequire('util')

  function View(name, opts) {
    Writable.call(this);
    this._writableState.objectMode = true;
    opts = opts || {}
    this.name = name || 'index'
    this.ext = opts.ext || '.html'
    this.dataKey = opts.dataKey || 'data'
    this.options = opts
    this.data = opts.data || Object.create(null)
    this.renderer = opts.renderer || fn
  }
  util.inherits(View, Writable)

  View.prototype._write = function(chunk, encoding, cb) {
    if (!Array.isArray(this.data[this.dataKey])) this.data[this.dataKey] = []
    this.data[this.dataKey].push(chunk)
    cb()
  }

  View.prototype.render = function(el) {
    var self = this
    function r(el) {
      var filepath = self.name
      if (filepath.indexOf('.') === -1) filepath += self.ext
      el.innerHTML = self.renderer(filepath, self.data, self.options)
    }
    if (el.length) for (var i = 0; i < el.length; i++) r(el[i])
    else r(el)
    return this
  }

  View.prototype.set = function(name, value) {
    if (!value) this.data[this.dataKey] = name
    else this.data[name] = value
    return this
  }

  return View
}