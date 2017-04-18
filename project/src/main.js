// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Tap from 'v-tap'

import router from './router'
import store from './store'

Vue.config.productionTip = false
// Vue.use(Tap)
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'touch'})

var axios = require('axios')
Vue.prototype.$http = axios
axios.interceptors.request.use(
  config => {
    if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

var cordovajsEl = document.createElement('script')
cordovajsEl.setAttribute('type', 'text/javascript')
cordovajsEl.setAttribute('src', 'cordova.js')
document.body.appendChild(cordovajsEl)

/* eslint-disable no-new */
document.addEventListener('deviceready', () => {
  // get app version
  // window.cordova.getAppVersion.getVersionNumber().then(function (version) {
  //   alert(version)
  // })
  if (window.cordova.platformId === 'android') {
    window.LightStatusBar.isSupported(function (success) {
      if (success) {
        window.LightStatusBar.setStatusBarColor('#ffffffff')
      }
    })
  }
  Vue.prototype.$platform = window.cordova.platformId
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}, false)
