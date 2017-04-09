// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Tap from 'v-tap'

Vue.config.productionTip = false
Vue.use(Tap)

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
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}, false)
