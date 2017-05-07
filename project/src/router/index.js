import Vue from 'vue'
import Router from 'vue-router'
import modules from '@/modules'

Vue.use(Router)

Router.prototype.go = function (n) {
  if (n < 0) {
    this.isBack = true
  } else {
    this.isBack = false
  }
  this.history.go(n)
}

Router.prototype.push = function (location, onComplete, onAbort) {
  this.isBack = false
  this.history.push(location, onComplete, onAbort)
}

function getRoutes (el) {
  var component = el.module || el
  if (!component.name) {
    console.error(component.__file + '缺少name', component)
    return
  }
  var name = component.name
  var path = '/' + name
  var children = []
  if (el.children) {
    for (var i = 0; i < el.children.length; i++) {
      children.push(getRoutes(el.children[i]))
    }
  }
  return {
    path,
    name,
    children,
    component
  }
}

var routes = [
  {
    path: '/',
    redirect: { name: 'main' }
  }
]

for (var m in modules) {
  routes.push(getRoutes(modules[m]))
}

export default new Router({
  routes
})
