import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myPlugin = store => {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    let book = localStorage.getItem(localStorage.key(i))
    book = JSON.parse(book)
    store.state.books.push(book)
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
      showmore: false
    }
  },
  mutations: {
    // mutation: (state, payload) => {
    //   state.xx = payload.xx
    // }
    add (state, payload) {
      state.books.push(payload)
      localStorage.setItem(payload.id, JSON.stringify(payload))
    },
    remove (state, payload) {
      state.books = state.books.filter(function (obj) {
        if (obj.id !== payload) {
          return true
        }
        return false
      })
      localStorage.removeItem(payload)
    },
    routing: (state, payload) => {
      state.routing = payload
      if (state.routing) {
        state.read.showmore = false
      }
    }
  },
  getters: {
    // xx: state => state.needScrollTops
    routing: state => state.routing
  },
  plugins: [myPlugin]
})
