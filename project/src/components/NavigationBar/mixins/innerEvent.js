export default {
  methods: {
    isInnerEvent: function (e, el) {
      var pos = this._getClientPosition(el)
      var x = e.clientX
      var y = e.clientY
      if (!x && !y) {
        x = e.changedTouches[0].clientX
        y = e.changedTouches[0].clientY
      }
      x -= pos.x
      y -= pos.y
      return (x <= el.offsetWidth && x >= 0 && y <= el.offsetHeight && y >= 0)
    },
    _getClientPosition (e) {
      var x = 0
      var y = 0
      while (e != null) {
        x += e.offsetLeft
        y += e.offsetTop
        e = e.offsetParent
      }
      return { x: x, y: y }
    }
  }
}
