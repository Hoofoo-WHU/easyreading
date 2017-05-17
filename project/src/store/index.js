import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myPlugin = store => {
  var books = JSON.parse(localStorage.getItem('book'))
  for (var i = books.length - 1; i >= 0; i--) {
    store.state.books.push(books[i])
  }
}
export default new Vuex.Store({
  state: {
    // xx: {}
    books: [],
    routing: false,
    read: {
      bookid: undefined,
      pages: [],
      page: 0,
      showmore: false,
      showtoc: false
    },
    modal: {
      close: undefined,
      size: 0
    }
  },
  mutations: {
    // mutation: (state, payload) => {
    //   state.xx = payload.xx
    // }
    add (state, payload) {
      state.books.push(payload)
      var json = JSON.stringify(state.books)
      localStorage.setItem('book', json)
      // console.log(Date.parse('2017-05-10T02:50:38.907056Z') > Date.now())
      // console.log(Date.parse('2017-05-10T02:50:38.907056Z'))
      // console.log(Date.now())
      // localStorage.setItem(localStorage.key(0), Date.now())
      // console.log(Vue.prototype.$http.baseURI)
      // Vue.prototype.$http.post('/user/identifier/check', {'identifier': 13287678951, 'function': 0})
      // .then(response => {
      //   alert(response.data.available)
      // })
    },
    remove (state, payload) {
      state.books = state.books.filter(function (obj) {
        if (obj.id !== payload) {
          return true
        }
        return false
      })
      var json = JSON.stringify(state.books)
      localStorage.removeItem('book')
      localStorage.setItem('book', json)
    },
    routing: (state, payload) => {
      state.routing = payload
      if (state.routing) {
        // console.log(this.a)
        this.a.commit('closemodal')
      }
    },
    addmodal: (state, payload) => {
      if (!state.modal.close) {
        state.modal.close = new Set()
      }
      state.modal.size++
      state.modal.close.add(payload)

      // console.log(state.modal.close.size)
    },
    removemodal: (state, payload) => {
      if (state.modal.close && state.modal.close.has(payload)) {
        state.modal.close.delete(payload)
        state.modal.size--
      }
    },
    closemodal: (state) => {
      // console.log('closemodal')
      if (state.modal.close && state.modal.close.size > 0) {
        for (let i of state.modal.close) {
          i()
        }
        state.modal.close.clear()
        state.modal.size = 0
      }
    }
  },
  getters: {
    // xx: state => state.needScrollTops
    routing: state => state.routing,
    hasModal: state => state.modal.size > 0
  },
  plugins: [myPlugin]
})
