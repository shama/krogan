module.exports = function() {
  var gui = nodeRequire('nw.gui')
  gui.Window.get().showDevTools()
}