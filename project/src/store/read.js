const namespace = (key) => {
  return 'read/' + key
}
const defaults = {
  brightness: 1,
  fontSize: 14,
  fontFamily: 'initial',
  background: '#f2f2f2',
  foreground: '#222222'
}
const keyPre = 'easyreading_read_'
const keys = {
  bookid: keyPre + 'bookid',
  brightness: keyPre + 'brightness',
  fontSize: keyPre + 'font_size',
  fontFamily: keyPre + 'font_family',
  background: keyPre + 'background',
  foreground: keyPre + 'foreground'
}

const read = {
  state: {
    bookid: undefined,
    brightness: undefined,
    fontSize: undefined,
    fontFamily: undefined,
    background: undefined,
    foreground: undefined,
    showmore: false
  },
  mutations: {
    [namespace('bookid')]: (state, bookid) => {
      state.bookid = bookid
    },
    [namespace('brightness')]: (state, brightness) => {
      state.brightness = brightness
      localStorage.setItem(keys.brightness, state.brightness)
    },
    [namespace('fontSize')]: (state, fontSize) => {
      state.fontSize = fontSize
      localStorage.setItem(keys.fontSize, state.fontSize)
    },
    [namespace('fontFamily')]: (state, fontFamily) => {
      state.fontFamily = fontFamily
      localStorage.setItem(keys.fontFamily, state.fontFamily)
    },
    [namespace('background')]: (state, background) => {
      state.background = background
      localStorage.setItem(keys.background, state.background)
    },
    [namespace('foreground')]: (state, foreground) => {
      state.foreground = foreground
      localStorage.setItem(keys.foreground, state.foreground)
    },
    [namespace('showmore')]: (state, show) => {
      state.showmore = show
    }
  },
  actions: {
  },
  getters: {
    [namespace('bookid')]: state => state.bookid,
    [namespace('brightness')]: state => {
      if (state.brightness === undefined) {
        const _brightness = parseFloat(localStorage.getItem(keys.brightness))
        if (_brightness) {
          state.brightness = _brightness
        } else {
          state.brightness = defaults.brightness
        }
      }
      return state.brightness
    },
    [namespace('fontSize')]: state => {
      if (state.fontSize === undefined) {
        const _fontSize = parseInt(localStorage.getItem(keys.fontSize))
        if (_fontSize) {
          state.fontSize = _fontSize
        } else {
          state.fontSize = defaults.fontSize
        }
      }
      return state.fontSize
    },
    [namespace('fontFamily')]: state => {
      if (state.fontFamily === undefined) {
        const _fontFamily = localStorage.getItem(keys.fontFamily)
        if (_fontFamily) {
          state.fontFamily = _fontFamily
        } else {
          state.fontFamily = defaults.fontFamily
        }
      }
      return state.fontFamily
    },
    [namespace('background')]: state => {
      if (state.background === undefined) {
        const _background = localStorage.getItem(keys.background)
        if (_background) {
          state.background = _background
        } else {
          state.background = defaults.background
        }
      }
      return state.background
    },
    [namespace('foreground')]: state => {
      if (state.foreground === undefined) {
        const _foreground = localStorage.getItem(keys.foreground)
        if (_foreground) {
          state.foreground = _foreground
        } else {
          state.foreground = defaults.foreground
        }
      }
      return state.foreground
    },
    [namespace('showmore')]: state => state.showmore
  }
}

export default read
