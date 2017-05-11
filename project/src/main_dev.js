// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Tap from 'v-tap'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'touch'})

import router from './router'
import store from './store'

var axios = require('axios')
Vue.prototype.$http = axios.create({
  baseURL: 'http://oott.me',
  timeout: 1000
})
Vue.prototype.$http.interceptors.request.use(
  config => {
    if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `JWT ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

Vue.prototype.$http.interceptors.response.use(
  response => {
  // Do something with response data
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          router.push({name: 'login'})
      }
    }
    return Promise.reject(err)
  }
)
Vue.config.productionTip = false
// Vue.use(Tap)
Vue.prototype.$platform = 'dev'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
