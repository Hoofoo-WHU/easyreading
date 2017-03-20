// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

var cordovajsEl = document.createElement('script')
cordovajsEl.setAttribute('type', 'text/javascript')
cordovajsEl.setAttribute('src', 'cordova.js')
document.body.appendChild(cordovajsEl)

/* eslint-disable no-new */
document.addEventListener('deviceready', () => {
  console.log('cordova start up')
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}, false)
