import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myPlugin = store => {
  if (localStorage.getItem('book')) {
    var books = JSON.parse(localStorage.getItem('book'))
    for (var i = books.length - 1; i >= 0; i--) {
      store.state.books.push(books[i])
    }
  }
  // localStorage.clear()
  if (!localStorage.getItem('time')) {
    localStorage.setItem('time', Date.now())
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
      localStorage.removeItem('time')
      localStorage.setItem('time', Date.now())
      if (state.token) {
        Vue.prototype.$http.post('/bookshelf', {'book_id': parseInt(payload.id)})
        .then(response => {
        })
      }
      // console.log(Date.parse('2017-05-10T02:50:38.907056Z') > Date.now())
      // console.log(Date.parse('2017-05-10T02:50:38.907056Z'))
      // console.log(Date.now())
      // localStorage.setItem(localStorage.key(0), Date.now())
      // console.log(Vue.prototype.$http)
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
      if (state.token) {
        Vue.prototype.$http.delete('/bookshelf/book/' + payload)
      }
      localStorage.removeItem('time')
      localStorage.setItem('time', Date.now())
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
    },
    synchronize: (state) => {
      if (state.token) {
        Vue.prototype.$http.get('/bookshelf/status')
        .then(response => {
          var localTime = localStorage.getItem('time')
          var severTime = Date.parse(response.data.update_timestamp)
          console.log(localTime)
          console.log(severTime)
          if (localTime > severTime && state.books.length > 0) {
            if (localStorage.getItem('book')) {
              var books = JSON.parse(localStorage.getItem('book'))
              var bookId = ''
              for (var i = books.length - 1; i >= 0; i--) {
                bookId += books[i].id + ','
              }
              Vue.prototype.$http.put('/bookshelf', {'book_id': bookId.substring(0, bookId.length - 1)})
              .then(response => {
                localStorage.removeItem('time')
                localStorage.setItem('time', Date.parse(response.data.update_timestamp))
              })
            }
          } else {
            Vue.prototype.$http.get('/bookshelf')
            .then(response => {
              var books = response.data.results
              console.log(books)
              state.books = []
              for (var i = 0; i < books.length; i++) {
                state.books.push(books[i])
                state.books[i].id = state.books[i].book_id
                state.books[i].cover = 'http://oott.me' + state.books[i].cover
              }
              console.log(state.books)
              var json = JSON.stringify(state.books)
              localStorage.removeItem('book')
              localStorage.setItem('book', json)
              localStorage.removeItem('time')
              localStorage.setItem('time', severTime)
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    token: (state, payload) => {
      localStorage.setItem('easyreading_token', payload.token)
      localStorage.setItem('easyreading_expires_at', payload.expires_at)
      state.token = payload.token
      state.expires_at = payload.expires_at
    },
    logout: (state) => {
      localStorage.removeItem('easyreading_token')
      localStorage.removeItem('easyreading_expires_at')
      state.token = undefined
      state.expires_at = undefined
    }
  },
  getters: {
    // xx: state => state.needScrollTops
    routing: state => state.routing,
    hasModal: state => state.modal.size > 0,
    token: (state) => {
      let token = localStorage.getItem('easyreading_token')
      if (token) {
        state.token = token
      }
      return state.token
    },
    expires_at: (state) => {
      let expiresAt = localStorage.getItem('easyreading_expires_at')
      if (expiresAt) {
        state.expires_at = expiresAt
      }
      return state.expires_at
    }
  },
  plugins: [myPlugin]
})
