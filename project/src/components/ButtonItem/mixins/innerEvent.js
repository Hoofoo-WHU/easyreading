export default {
  methods: {
    isInnerEvent: function (e, el) {
      var pos = el.getBoundingClientRect()
      var x = e.clientX
      var y = e.clientY
      if (!x && !y) {
        x = e.changedTouches[0].clientX
        y = e.changedTouches[0].clientY
      }
      return (x >= pos.left && x <= pos.right && y <= pos.bottom && y >= pos.top)
    }
  }
}
